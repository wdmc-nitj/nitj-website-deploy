let iconSet = [
    'medal',
    'star',
    'medal',
    'user-tie',
    'plane',
    'diagram-project'
]

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
        a.target = '_blank'
        a.innerHTML = `<div style="display:flex; align-items:center; justify-content:space-between"><div>`+
        dataset[x].name+
        ` <i style="font-weight:thinner;" class="fa-solid fa-arrow-up-right-from-square"></i></div>`+
        `<i style="right:0" class="fa-solid fa-${iconSet[x]} text-3xl"></i></div>`
        a.style.backgroundColor = (dataset[x].buttoncolor || dataset[x].color)+'88';
        a.style.borderColor = (dataset[x].buttoncolor || dataset[x].color);
        a.style.color = dataset[x].textcolor;
        a.style.width = (!x%2 && x==dataset.length-1)?'40%':
                        (
                            sizeAlgo(x)?'54%':'44%'
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