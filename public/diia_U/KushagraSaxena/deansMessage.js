async function fetchData(){
    try
    {
        const deanDetails = await fetch("/api/diia/dean-details/")
        if(!deanDetails.ok)
        {
            throw new Error(`Status:${res.status} in deanDetails`)
        }
        const data = await deanDetails.json()
        console.log(data)
        return data
    }catch(err)
    {
        console.log("Failed dean details",err)
    }
}

async function addHTML(){
    // console.log("HTML adding..")
    const dataDean = await fetchData()
    if(! dataDean.length == 0)
    {
        const deanName = document.getElementsByClassName("box")[0].children
        deanName[0].innerHTML = dataDean.name
        deanName[1].innerHTML = dataDean.designation

        const deanMessage = document.getElementsByClassName("content")[0].children
        deanMessage[0].innerHTML = dataDean.message

        const readMore = document.getElementsByClassName("readMore")[0].children
        readMore[0].href = "/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section"
        readMore[0].target = "_blank"
    }
}

window.onload = async function(){
    addHTML()
}


