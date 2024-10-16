/*MOUs*/
let sectionContainer = document.getElementsByClassName("sectionContainer")
// for(let i of sectionContainer)
// {
//     i.addEventListener("click", () => {
//         window.open("/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section","_blank")
//     })
// }

function sliderMOU(section)
{
    // console.log("slider:",section[0].classList)
    let visible = 0
    // section[0].style.opacity = 1;
    setInterval(()=>{
        for(let i = 0; i < section.length; i++)
        {
            if(visible == i)
            {
                section[i].classList.remove("flex")
                section[i].classList.add("hidden")
                // section[i].style.opacity = 0
                if(i+1 < section.length)
                {
                    section[i+1].classList.remove("hidden")
                    section[i+1].classList.add("flex")
                    // section[i+1].style.opacity = 1
                    visible = i+1
                    return true
                }
                else{
                    section[0].classList.remove("hidden")
                    section[0].classList.add("flex")
                    // section[0].style.opacity = 1
                    visible = 0
                    return true
                }
            }
        }
    }, 5000)
}


function applyEffectToSection()
{
    let section1 = document.getElementsByClassName("section1");
    let section2 = document.getElementsByClassName("section2");
    let section3 = document.getElementsByClassName("section3");
    sliderMOU(section1)
    sliderMOU(section2)
    sliderMOU(section3)

    if(window.outerWidth <= 425)
    {
        let elements2 = document.getElementsByClassName("section2")
        for(let i = 0; i < elements2.length; i++)
        {
            // elements1[0].parentNode.insertBefore(elements1[3],elements1[1])   
            elements2[i].childNodes[0].parentNode.insertBefore(elements2[i].childNodes[3],elements2[i].childNodes[1])   
            // elements2[0].parentNode.insertBefore(elements2_2[3],elements2_2[1])   
            // elements3[0].parentNode.insertBefore(elements3[3],elements3[1])  
            console.log(elements2) 
        }
    }
}

async function fetchDataMous(){                      
    try{
        const res = await fetch("https://nitjfinal.onrender.com/api/diia/mous")
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

async function addToHtmlMous(){
    let card = document.getElementsByClassName("card")
    let image = document.getElementsByClassName("image")
    try{
        let data = await fetchDataMous()

        let flagSection1 = 0
        let flagSection2 = 0
        let flagSection3 = 0
        for(let i = 0; i < data.length; i++)
        {

            console.log("national")
            if(data[i].type == "Indian Institutions")
            {
                let national = document.getElementsByClassName("national")[0]
                national.innerHTML += `<div class="section1 ${flagSection1 == 0? "flex": "hidden"} gap-5 sm:flex-row flex-col">
                    <div class="sm:w-2/3 w-full">
                        <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                    </div>
                    <div class="relative card sm:w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 xsm:gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-xl xsm:text-sm">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section" target="_blank" class="underline">Read More</a>
                    </div>
                </div>`
                flagSection1 = 1
            }

            else if(data[i].type == "Industry")
            {
                let industry = document.getElementsByClassName("industry")[0]
                industry.innerHTML += `<div class="section2 ${flagSection2 == 0? "flex": "hidden"} gap-5 sm:flex-row flex-col">
                    <div class="relative card sm:w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 xsm:gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-xl xsm:text-sm">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section" target="_blank"  class="underline">Read More</a>
                    </div>
                    <div class="sm:w-2/3 w-full">
                        <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                    </div>
                </div>`

                flagSection2 = 1                
            }

            else if(data[i].type == "international")
            {
                let international = document.getElementsByClassName("international")[0]
                international.innerHTML += `<div class="section3 ${flagSection3 == 0? "flex": "hidden"} gap-5 sm:flex-row flex-col w-full">
                    <div class="sm:w-2/3 w-full">
                        <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                    </div>
                    <div class="relative card w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 xsm:gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-xl xsm:text-sm">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section"  target="_blank" class="underline">Read More</a>
                    </div>
                </div>`
                flagSection3 = 1
            }
        }
    }
    catch(err)
    {
        console.log("Error in adding MOU's HTML")
    }
}



// window.onload = async function() {
//     await addToHtmlMous(),
//     applyEffectToSection()
// }
window.addEventListener('DOMContentLoaded', async()=>{
        await addToHtmlMous(),
        applyEffectToSection()
})

