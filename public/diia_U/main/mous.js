/*MOUs*/
let sectionContainer = document.getElementsByClassName("sectionContainer")
// for(let i of sectionContainer)
// {
//     i.addEventListener("click", () => {
//         window.open("/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section","_blank")
//     })
// }

function sliderMOU(section, dir, count)
{
    // console.log("slider:",section[0].classList)
    // let visible = 0
    // section[0].style.opacity = 1;

    section.addEventListener('wheel', (event) => {
        if (event.deltaY === 0) {
            event.preventDefault(); 
        } // to prevent default scrolling
    });

    let scrolled = 0
    setInterval(()=>{
        // console.log("Total scroll req",(count-1)*section.clientWidth)
        if(dir)
        {
            if(scrolled < (count-1)*section.clientWidth)
            {
                section.scrollBy({
                    left: section.clientWidth,
                    behavior: 'smooth'
                })
                scrolled += section.clientWidth
                // console.log("scrolld left",scrolled)
            }
            else
            {
                // console.log("Scrolled  right")
                section.scrollBy({
                    left: -scrolled,
                    behavior: 'smooth'
                })
                scrolled = 0
            }
        }
        else
        {
            // console.log("indutry scroll right")
            if(scrolled < (count-1)*section.clientWidth)
            {
                section.scrollBy({
                    left: -section.clientWidth,
                    behavior: 'smooth'
                })
                scrolled += section.clientWidth
                // console.log(scrolled)
            }
            else
            {
                section.scrollBy({
                    left: scrolled,
                    behavior: 'smooth'
                })
                scrolled = 0
            }
        }
    }, 5000)
}


function applyEffectToSection()
{
    let section1 = document.getElementsByClassName("section1");
    let section2 = document.getElementsByClassName("section2");
    let section3 = document.getElementsByClassName("section3");

    if(window.outerWidth <= 425)
    {
        let elements2 = document.getElementsByClassName("section2")
        for(let i = 0; i < elements2.length; i++)
        {
            // elements1[0].parentNode.insertBefore(elements1[3],elements1[1])   
            elements2[i].childNodes[0].parentNode.insertBefore(elements2[i].childNodes[3],elements2[i].childNodes[1])   
            // elements2[0].parentNode.insertBefore(elements2_2[3],elements2_2[1])   
            // elements3[0].parentNode.insertBefore(elements3[3],elements3[1])  
            // console.log(elements2) 
        }
    }
}

async function fetchDataMous(){                      
    try{
        const res = await fetch("/api/diia/mous")
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
let national = document.getElementsByClassName("national")[0]
let industry = document.getElementsByClassName("industry")[0]
let international = document.getElementsByClassName("international")[0]
let count1 = 0, count2 = 0, count3 = 0

async function addToHtmlMous(){
    let card = document.getElementsByClassName("card")
    let image = document.getElementsByClassName("image")
    try{
        let data = await fetchDataMous()
        for(let i = 0; i < data.length; i++)
        {
            // console.log("national")
            if(data[i].type == "Indian Institutions")
                {
                count1 += 1 
                national.innerHTML += `<div class=" section1 flex flex-none w-full gap-5 sm:flex-row flex-col">
                    <div class="sm:w-2/3 w-full relative">
                        <img src=${data[i].Image} alt="" class=" image rounded-xl w-full" >
                        <div class="absolute bottom-0 w-full" >
                            <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${data[i].location}</p>
                        </div>
                    </div>
                    <div class="relative card sm:w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 flex items-center justify-center font-semibold" style="color: #0056b3;">Indian Institutions</p>
                        <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-sm text-sm">${data[i].name}</p>
                        <p class="lg:text-sm text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section" target="_blank" class="underline">Read More</a>
                    </div>
                </div>`
            }

            else if(data[i].type == "Industry")
            {
                count2 += 1 
                industry.innerHTML += `<div class=" section2 flex flex-none w-full gap-5 sm:flex-row flex-col">
                    <div class="relative card sm:w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 flex items-center justify-center font-semibold" style="color: #0056b3;">Industry Partners</p>
                        <img src="Student Center (1).png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-sm text-sm">${data[i].name}</p>
                        <p class="lg:text-sm text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section" target="_blank"  class="underline">Read More</a>
                    </div>
                    <div class="relative sm:w-2/3 w-full">
                        <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                        <div class="absolute bottom-0 w-full">
                            <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${data[i].location}</p>
                        </div>
                    </div>
                </div>`
            }

            else if(data[i].type == "International Institutions")
            {
                count3 += 1  
                international.innerHTML += `<div class=" section3 flex flex-none w-full gap-5 sm:flex-row flex-col">
                    <div class="relative sm:w-2/3 w-full">
                        <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                        <div class="absolute bottom-0 w-full">
                            <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${data[i].location}</p>
                        </div>
                    </div>
                    <div class="relative card sm:w-1/3 flex flex-col p-6 rounded-2xl lg:gap-7 md:gap-3 gap-5   scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                        <p class="bg-white rounded-3xl w-fit h-5 text-xs p-2 flex items-center justify-center font-semibold" style="color: #0056b3;">Global Partners</p>
                        <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                        <p class="lg:text-2xl md:text-sm text-sm">${data[i].name}</p>
                        <p class="lg:text-sm text-xs lg:h-full h-12 overflow-clip">${data[i].description.substring(0,100)}...</p>
                        <a href="/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section"  target="_blank" class="underline">Read More</a>
                    </div>
                </div>`
            }
        }
    }
    catch(err)
    {
        console.log("Error in adding MOU's HTML:",err)
    }
    // console.log(count1,"count1")
    industry.scrollBy({
        left:(count2-1) * industry.clientWidth,
        behavior:"smooth"
    })
    sliderMOU(national,1,count1)
    sliderMOU(industry,0,count2)
    sliderMOU(international,1,count3)
}

// window.onload = async function() {
//     await addToHtmlMous(),
//     applyEffectToSection()
// }
window.addEventListener('DOMContentLoaded', async()=>{
        await addToHtmlMous(),
        applyEffectToSection()
})

