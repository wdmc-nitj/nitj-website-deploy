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
    try{
        let data = await fetchDataRanking()
        console.log(data)
        for(let i = 0; i < data.length; i++)
        {
            rank[i].innerHTML = `Ranked ${data[i].Rank}th in ${data[i].title1}`
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