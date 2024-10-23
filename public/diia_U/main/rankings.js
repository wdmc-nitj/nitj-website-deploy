async function fetchDataRanking(){                      
    try{
        const res = await fetch("/api/diia/rankings")
        if(!res.ok)
        {
            throw new Error(`Status:${res.status}`)
        }
        const data = await res.json()
        // console.log(data)
        return data
    }catch(err)
    {
        console.log("failed:",err)
    }
}

async function addToHtmlRanking(){
    let rank = document.getElementsByClassName("rank")
    console.log(window.innerWidth)
    try{
        let data = await fetchDataRanking()
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].show === true)
            {
                if(window.innerWidth > 425)
                {
                    rank[data[i].order].innerHTML = `${data[i].description.substring(0,50)}...`
                }

                else
                {
                    rank[data[i].order].innerHTML = `${data[i].description.substring(0,125)}...`
                    console.log("Chnaged")
                }
            }
        }
    }
    catch(err)
    {
        console.log("Error in adding Rankings HTML",err)
    }
}

// window.onload = async function() {
//     await addToHtmlRanking()
// }

window.addEventListener('DOMContentLoaded', addToHtmlRanking)