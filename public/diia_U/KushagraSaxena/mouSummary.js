async function fetchDataMous(){                      
    try{
        const res = await fetch("https://nitjfinal.onrender.com/api/diia/mous")
        if(!res.ok)
        {
            throw new Error(`Status:${res.status}`)
        }
        const data = await res.json()
        return data
    }catch(err)
    {
        console.log("failed:",err)
    }
}

async function addToHtmlMous(){
    let national = document.getElementsByClassName("cardContainerNational")[0]
    let industry = document.getElementsByClassName("cardContainerIndustry")[0]
    let international = document.getElementsByClassName("cardContainerInternational")[0]
    try{
        let data = await fetchDataMous()
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].showInSummary === true)
            {
                if((data[i].type).toLowerCase() === "indian institutions")
                {
                    national.innerHTML = `<div class="card w-full bg-blue-100 flex flex-col gap-10 rounded-2xl p-5">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2">
                        <p>${data[i].ShortDes}</p>
                        <p>${(String(data[i].location) !== "undefined")?data[i].location:""}</p>
                        <div>
                            <a href="">Website</a>
                        </div>
                    </div>
                    <div class="lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="">MOU</a>
                    </div>
                </div>`
                }

                else if((data[i].type).toLowerCase() === "industry")
                {
                    industry.innerHTML = `<div class="card w-full bg-blue-100 flex flex-col gap-10 rounded-2xl p-5">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2">
                        <p>${data[i].ShortDes}</p>
                        <p>${(String(data[i].location) !== "undefined")?data[i].location:""}</p>
                        <div>
                            <a href="">Website</a>
                        </div>
                    </div>
                    <div class="lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="">MOU</a>
                    </div>
                </div>`
                }

                else if((data[i].type).toLowerCase() == "international institutions")
                {
                    international.innerHTML = `<div class="card w-full bg-blue-100 flex flex-col gap-10 rounded-2xl p-5">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2">
                        <p>${data[i].ShortDes}</p>
                        <p>${(String(data[i].location) !== "undefined")?data[i].location:""}</p>
                        <div>
                            <a href="">Website</a>
                        </div>
                    </div>
                    <div class="lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="">MOU</a>
                    </div>
                </div>`
                }
            }
        }
    }
    catch(err)
    {
        console.log("Error in adding MOU's HTML:",err)
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    await addToHtmlMous()
})