function sizeAlgo(num) {
    // this function returns true if the index of the tile is for a wide tile;
    const special = (a)=> (a%2)?(a+1)/2:a/2
    // for(let i=0; i<20; i++) console.log('for',i,'is',special(i))
    for(let i=0; true; i++){
        console.log('comparing',((2*special(i))+i),'with',num)
        if(((2*special(i))+i) == num ) {console.log("condition matched");return true}
        else if(((2*special(i))+i) > num ) {console.log("condition unfavourable");return false}
    }
    // return false;
}

function genTiles(dataset) {
    let container = document.getElementById('tileDiv')
    for(let x=0; x<dataset.length; x++) {
        
        let a = document.createElement('a');
        a.href = dataset[x].link
        a.textContent = dataset[x].name
        a.style.backgroundColor = dataset[x].color;
        a.style.color = dataset[x].textcolor;
        a.style.width = (!x%2 && x==dataset.length-1)?'50%':
                        (
                            sizeAlgo(x)?'40%':'30%'
                        )
        a.classList.add('tile');

        container.appendChild(a);
    }
}

window.onload = async function() {
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