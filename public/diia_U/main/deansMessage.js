async function dean_fetchData(){
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
    const dataDean = await dean_fetchData()

    if(dataDean)
    {
        const deanName = document.getElementsByClassName("box")[0].children
        deanName[0].innerHTML = dataDean.filter(e=>String(e.designation).toLowerCase() == 'dean')[0].name

        const deanMessage = document.getElementsByClassName("content")[0].children
        deanMessage[0].innerHTML = dataDean.filter(e=>String(e.designation).toLowerCase() == 'dean')[0]
                .message.split(' ').slice(0,200).join(' ')
        document.getElementById('dean-div').getElementsByClassName('image')[0].src = dataDean.filter(e=>String(e.designation).toLowerCase() == 'dean')[0].profileLink
        // const readMore = document.getElementsByClassName("readMore")[0].children
        // readMore[0].href = "/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section"
        // readMore[0].target = "_blank"
    }
}

window.addEventListener('DOMContentLoaded', addHTML)

