/*MOUs*/
if(window.outerWidth <= 425)
{
    let elements1 = document.getElementsByClassName("section1")[1].childNodes
    let elements2_1 = document.getElementsByClassName("section2")[0].childNodes
    let elements2_2 = document.getElementsByClassName("section2")[2].childNodes
    let elements3 = document.getElementsByClassName("section3")[1].childNodes
    elements1[0].parentNode.insertBefore(elements1[3],elements1[1])   
    elements2_1[0].parentNode.insertBefore(elements2_1[3],elements2_1[1])   
    elements2_2[0].parentNode.insertBefore(elements2_2[3],elements2_2[1])   
    elements3[0].parentNode.insertBefore(elements3[3],elements3[1])   
}

let sectionContainer = document.getElementsByClassName("sectionContainer")
for(let i of sectionContainer)
{
    i.addEventListener("click", () => {
        window.open("/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section","_blank")
    })
}

function sliderMOU(section)
{
    let visible = 0
    section[0].style.opacity = 1;
    setInterval(()=>{
        for(let i = 0; i < section.length; i++)
        {
            if(visible == i)
            {
                section[i].classList.remove("grid")
                section[i].classList.add("hidden")
                section[i].style.opacity = 0
                if(i+1 < section.length)
                {
                    section[i+1].classList.remove("hidden")
                    section[i+1].classList.add("grid")
                    section[i+1].style.opacity = 1
                    visible = i+1
                    return true
                }
                else{
                    section[0].classList.remove("hidden")
                    section[0].classList.add("grid")
                    section[0].style.opacity = 1
                    visible = 0
                    return true
                }
            }
        }
    }, 5000)
}
let section1 = document.getElementsByClassName("section1");
let section2 = document.getElementsByClassName("section2");
let section3 = document.getElementsByClassName("section3");
sliderMOU(section1)
sliderMOU(section2)
sliderMOU(section3)


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
        console.log(data)
        let contentArrayMous = [
            // international
            {
                image: data[0].Image,
                type: data[0].type,
                name: data[0].name,
                description: data[0].description
            },
            {
                image: data[1].Image,
                type: data[1].type,
                name: data[1].name,
                description: data[1].description
            },
            {
                image: data[2].Image,
                type: data[2].type,
                name: data[2].name,
                description: data[2].description
            },
            
            // industry
            {
                image: data[0].Image,
                type: data[0].type,
                name: data[0].name,
                description: data[0].description
            },
            {
                image: data[1].Image,
                type: data[1].type,
                name: data[1].name,
                description: data[1].description
            },
            {
                image: data[2].Image,
                type: data[2].type,
                name: data[2].name,
                description: data[2].description
            },
            
            // colaborative institutes
            {
                image: data[0].Image,
                type: data[0].type,
                name: data[0].name,
                description: data[0].description
            },
            {
                image: data[1].Image,
                type: data[1].type,
                name: data[1].name,
                description: data[1].description
            },
            {
                image: data[2].Image,
                type: data[2].type,
                name: data[2].name,
                description: data[2].description
            },
        ]

        for(let i = 0; i < contentArrayMous.length; i++)
        {
            image[i].src = contentArrayMous[i].image
            card[i].children[0].innerHTML += contentArrayMous[i].type
            card[i].children[1].innerHTML += contentArrayMous[i].name
            card[i].children[2].innerHTML += contentArrayMous[i].description
            // console.log(card[i])
        }
    }
    catch(err)
    {
        console.log("Error in adding MOU's HTML")
    }
}




/*rankings*/

let cardRank = document.getElementsByClassName("cardRank")
for(let i of cardRank)
{
    let el = i.childNodes[3].childNodes[3]
    // console.log(el)
    i.addEventListener('mouseover',()=>{
        el.classList.remove("border-accent")
        el.classList.add("border-accentOrange")
    })
    i.addEventListener('mouseout',()=>{
        el.classList.remove("border-accentOrange")
        el.classList.add("border-accent")
    })

    if(window.outerWidth > 768 )
    {
        i.classList.remove("w-full")
        i.classList.add("w-1/3")
    }

    else if(window.outerWidth == 768)
    {
        i.classList.remove("w-full","w-1/3")
        i.classList.add("w-64")
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
        const res = await fetch("https://nitjfinal.onrender.com/api/diia/rankings")
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
        let contentArrayRank = [
            {
                rank: `${data[0].Rank}<sup>th</sup>`,
                image: data[0].Image,  
                title1: data[0].title1,
                description: data[0].description   
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            },
            {
                rank: `${data[1].Rank}<sup>th</sup>`,
                image: data[1].Image,  
                title1: data[1].title1,
                description: data[1].description
            }
        ]
        for(let i = 0; i < contentArrayRank.length; i++)
        {
            imageClass[i].src = contentArrayRank[i].image
            rankClass[i].innerHTML += contentArrayRank[i].rank
            desClass[i].innerHTML += contentArrayRank[i].description
        }
    }
    catch(err)
    {
        console.log("Error in adding Rankings HTML")
    }
}

window.onload = function() {
    addToHtmlMous(),
    addToHtmlRanking()
}
