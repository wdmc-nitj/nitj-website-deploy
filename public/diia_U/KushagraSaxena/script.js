/*MOUs*/
let sectionContainer = document.getElementsByClassName("sectionContainer")
for(let i of sectionContainer)
{
    i.addEventListener("click", () => {
        window.open("/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section","_blank")
    })
}

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
                section[i].classList.remove("grid")
                section[i].classList.add("hidden")
                // section[i].style.opacity = 0
                if(i+1 < section.length)
                {
                    section[i+1].classList.remove("hidden")
                    section[i+1].classList.add("grid")
                    // section[i+1].style.opacity = 1
                    visible = i+1
                    return true
                }
                else{
                    section[0].classList.remove("hidden")
                    section[0].classList.add("grid")
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
        let elements2 = document.getElementsByClassName("section2")[0].childNodes
        // elements1[0].parentNode.insertBefore(elements1[3],elements1[1])   
        elements2[0].parentNode.insertBefore(elements2[3],elements2[1])   
        // elements2[0].parentNode.insertBefore(elements2_2[3],elements2_2[1])   
        // elements3[0].parentNode.insertBefore(elements3[3],elements3[1])   
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

async function addToHtmlMous(){
    let card = document.getElementsByClassName("card")
    let image = document.getElementsByClassName("image")
    try{
        let data = await fetchDataMous()
        console.log(data)
        // let contentArrayMous = [
        //     // international
        //     {
        //         image: data[0].Image,
        //         type: data[0].type,
        //         name: data[0].name,
        //         description: data[0].description
        //     },
        //     {
        //         image: data[1].Image,
        //         type: data[1].type,
        //         name: data[1].name,
        //         description: data[1].description
        //     },
        //     {
        //         image: data[2].Image,
        //         type: data[2].type,
        //         name: data[2].name,
        //         description: data[2].description
        //     },
            
        //     // industry
        //     {
        //         image: data[0].Image,
        //         type: data[0].type,
        //         name: data[0].name,
        //         description: data[0].description
        //     },
        //     {
        //         image: data[1].Image,
        //         type: data[1].type,
        //         name: data[1].name,
        //         description: data[1].description
        //     },
        //     {
        //         image: data[2].Image,
        //         type: data[2].type,
        //         name: data[2].name,
        //         description: data[2].description
        //     },
            
        //     // colaborative institutes
        //     {
        //         image: data[0].Image,
        //         type: data[0].type,
        //         name: data[0].name,
        //         description: data[0].description
        //     },
        //     {
        //         image: data[1].Image,
        //         type: data[1].type,
        //         name: data[1].name,
        //         description: data[1].description
        //     },
        //     {
        //         image: data[2].Image,
        //         type: data[2].type,
        //         name: data[2].name,
        //         description: data[2].description
        //     },
        // ]

        let flagSection1 = 0
        let flagSection2 = 0
        let flagSection3 = 0
        for(let i = 0; i < data.length; i++)
        {
            // image[i].src = contentArrayMous[i].image
            // card[i].children[0].innerHTML += contentArrayMous[i].type
            // card[i].children[1].innerHTML += contentArrayMous[i].name
            // card[i].children[2].innerHTML += contentArrayMous[i].description
            // console.log(card[i])

            console.log("national")
            if(data[i].type == "Indian Institutions")
            {
                let national = document.getElementsByClassName("national")[0]
                national.innerHTML += `<div class="section1 ${flagSection1 == 0? "grid": "hidden"} md:grid-cols-custom-grid gap-5 bg-white">
                    <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                    <div class="card w-10/12 flex flex-col p-6 rounded-2xl lg:gap-8 md:gap-5 xsm:gap-5 transition-all duration-400 ease-in-out-expo shadow-custom-shadow scrollbar-custom" style="background: linear-gradient(87.67deg, rgba(232, 237, 252, 0.687) -84.93%, rgba(153, 153, 153, 0.568) 203.85%)">
                        <p class="bg-white rounded-3xl w-fit text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <p class="lg:text-2xl md:text-sm xsm:text-sm text-darkPurple">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs text-darkPurple">${data[i].description}</p>
                    </div>
                </div>`
                flagSection1 = 1
            }

            else if(data[i].type == "Industry")
            {
                let industry = document.getElementsByClassName("industry")[0]
                industry.innerHTML += `<div class="section2 ${flagSection2 == 0? "grid": "hidden"} md:grid-cols-custom-grid-2 gap-5 bg-white">
                    <div class="card w-10/12 flex flex-col p-6 rounded-2xl lg:gap-8 md:gap-5 xsm:gap-5 transition-all duration-400 ease-in-out-expo shadow-custom-shadow scrollbar-custom" style="background: linear-gradient(87.67deg, rgba(232, 237, 252, 0.687) -84.93%, rgba(153, 153, 153, 0.568) 203.85%)">
                        <p class="bg-white rounded-3xl w-fit text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <p class="lg:text-2xl md:text-sm xsm:text-sm text-darkPurple">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs  text-darkPurple">">${data[i].description}</p>
                    </div>
                    <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                </div>`

                flagSection2 = 1                
            }

            else if(data[i].type == "international")
            {
                let international = document.getElementsByClassName("international")[0]
                international.innerHTML += ` <div class="section3 ${flagSection3 == 0? "grid": "hidden"} md:grid-cols-custom-grid gap-5 bg-white">
                    <img src=${data[i].Image} alt="" class="image rounded-xl w-full" >
                    <div class="card w-10/12 flex flex-col p-6 rounded-2xl lg:gap-8 md:gap-5 xsm:gap-5 transition-all duration-400 ease-in-out-expo shadow-custom-shadow scrollbar-custom" style="background: linear-gradient(87.67deg, rgba(232, 237, 252, 0.687) -84.93%, rgba(153, 153, 153, 0.568) 203.85%)">
                        <p class="bg-white rounded-3xl w-fit text-xs p-2 font-semibold" style="color: #0056b3;">${data[i].type}</p>
                        <p class="lg:text-2xl md:text-sm xsm:text-sm text-darkPurple">${data[i].name}</p>
                        <p class="lg:text-sm xsm:text-xs  text-darkPurple">${data[i].description}</p>
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




/*rankings*/

function applyEffectToRanking()
{
    let cardRank = document.getElementsByClassName("cardRank")
    for(let i of cardRank)
    {
        // let el = i.childNodes[3].childNodes[3]
        // // console.log(el)
        // i.addEventListener('mouseover',()=>{
        //     el.classList.remove("border-accent")
        //     el.classList.add("border-accentOrange")
        // })
        // i.addEventListener('mouseout',()=>{
        //     el.classList.remove("border-accentOrange")
        //     el.classList.add("border-accent")
        // })

        if(window.outerWidth > 768 )
        {
            i.classList.remove("w-10/12")
            i.classList.add("w-1/3")
        }

        else if(window.outerWidth == 768)
        {
            i.classList.remove("w-10/12","w-1/3")
            i.classList.add("w-64")
        }
    }
}

let leftScroll = document.getElementById("scrollLeft") 
let rightScroll = document.getElementById("scrollRight") 
let scroll = document.getElementsByClassName("scrollable")[0]
let flag = 1;

leftScroll.addEventListener('click',()=>{
    flag = 0;
    if(window.outerWidth < 768)
    {
        scroll.scrollBy({
            left: -scroll.clientWidth * 0.9354 ,
            behavior: 'smooth'
        })
    }
    else
    {
        scroll.scrollBy({
            left: -scroll.clientWidth * 0.345 ,
            behavior: 'smooth'
        })
    }
})

rightScroll.addEventListener('click',()=>{
    flag = 0;
    if(window.outerWidth < 768)
    {
        scroll.scrollBy({
            left: scroll.clientWidth * 0.9354 ,
            behavior: 'smooth'
        })
    }
    else
    {
        scroll.scrollBy({
            left: scroll.clientWidth * 0.345 ,
            behavior: 'smooth'
        })
    }
})

let count = 0
setInterval(()=>{
    if(flag)
    {
        if(window.outerWidth < 768)
        {
            scroll.scrollBy({
                left: scroll.clientWidth * 0.9354 ,
                behavior: 'smooth'
            })
            count += scroll.clientWidth * 0.9354 
            if(count > 2700)
            {
                scroll.scrollBy({
                    left: -count ,
                    behavior: 'smooth'
                })
                count = 0
            }
        }
        else
        {
            scroll.scrollBy({
                left: scroll.clientWidth * 0.345 ,
                behavior: 'smooth'
            })
            count += scroll.clientWidth * 0.345
            if(count > 2031)
            {
                scroll.scrollBy({
                    left: -count ,
                    behavior: 'smooth'
                })
                count = 0
            }
        }
    }
},5000)

let para0 = document.getElementsByClassName("nitj")[0]
let para1 = document.getElementsByClassName("ranking")[0]
if(window.outerWidth <= 1024)
{
    para0.classList.remove("text-4xl")
    para1.classList.remove("text-4xl")
    para0.classList.add("text-3xl")
    para1.classList.add("text-3xl")
}


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
    
    let imageClass = document.getElementsByClassName("classImage")

    let rankClass = document.getElementsByClassName("classRank")

    let desClass = document.getElementsByClassName("classDes")
    try{
        let data = await fetchDataRanking()
        console.log(data)
        // let contentArrayRank = [
        //     {
        //         rank: `${data[0].Rank}<sup>th</sup>`,
        //         image: data[0].Image,  
        //         title1: data[0].title1,
        //         description: data[0].description   
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     },
        //     {
        //         rank: `${data[1].Rank}<sup>th</sup>`,
        //         image: data[1].Image,  
        //         title1: data[1].title1,
        //         description: data[1].description
        //     }
        // ]

        for(let i = 0; i < data.length; i++)
        {
            // imageClass[i].src = data[i].Image
            // rankClass[i].innerHTML += data[i].Rank
            // desClass[i].innerHTML += data[i].description

            scroll.innerHTML += `<div class="cardRank flex-none flex flex-col gap-8 p-5 backdrop-blur-sm rounded-tl-2xl rounded-br-2xl h-72 w-10/12 transition-all duration-400 ease-in-out-expo hover:border-accentOrange hover:scale-105" style="background: linear-gradient(145deg, #ffffff, #d7e4f1);border: 2px solid transparent; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        
                        <div>
                            <img class="classImage w-36 h-20" alt="" src=${data[i].Image}>
                        </div>
                        <div class="flex flex-col gap-3 p-2">
                                <h2 class="classRank font-bold text-3xl ">${data[i].Rank}</h2>
                                <hr class="head-border flex items-center justify-center w-full transition-all duration-400 ease-in-out-expo"></hr>
                                <p class="classDes">${data[i].description}</p>
                        </div>
                        

                    </div>`
        }
    }
    catch(err)
    {
        console.log("Error in adding Rankings HTML")
    }
}

window.onload = async function() {
    await addToHtmlMous(),
    applyEffectToSection(),
    await addToHtmlRanking(),
    applyEffectToRanking()
}

