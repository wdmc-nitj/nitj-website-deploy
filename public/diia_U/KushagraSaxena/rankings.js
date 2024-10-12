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
    await addToHtmlRanking(),
    applyEffectToRanking()
}

