function sizeAlgo(num) {
    // this function returns true if the index of the tile is for a wide tile;
    const special = (a)=> (a%2)?(a+1)/2:a/2
    for(let i=0; true; i++){
        if(((2*special(i))+i) == num ) return true
        else if(((2*special(i))+i) > num ) return false
    }
}

function genTiles(dataset) {
    let container = document.getElementById('tileDiv')
    for(let x=0; x<dataset.length; x++) {
        
        let a = document.createElement('a');
        a.href = dataset[x].link
        a.textContent = dataset[x].name
        a.style.backgroundColor = (dataset[x].buttoncolor || dataset[x].color)+'aa';
        a.style.borderColor = (dataset[x].buttoncolor || dataset[x].color);
        a.style.color = dataset[x].textcolor;
        a.style.width = (!x%2 && x==dataset.length-1)?'50%':
                        (
                            sizeAlgo(x)?'40%':'30%'
                        )
        a.classList.add('tile');

        container.appendChild(a);
    }
}
document.addEventListener('DOMContentLoaded',genTilesFn)
async function genTilesFn() {
    try{
        console.log("trying to fetch")
        const response = await fetch(`/api/diia/color-button`, {
            method: 'get',
            headers: {
                'Content-Type':'application/json'
            }
        })
        if(response.status==200){
            const data = await response.json();
            if(data) {console.log(data); genTiles(data)}
        }
    }  catch(e) {console.log(e)}
}