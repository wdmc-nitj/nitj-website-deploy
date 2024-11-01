let data = [];
let currentIndex = 0;

async function fetchDataMous(){                      
    try{
        const res = await fetch("/api/diia/mous")
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
async function fetchData() {
    try {
      const response = await fetch(`/api/diia/opportunities`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      data = await response.json();
      console.log("Fetched Data:", data);
  
      // Sort data based on createdAt and take the latest 4 items
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dataSlider = data.slice(0, 4); // Take the most recent 4 items
    //   console.log(data);
      initSlider(dataSlider);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
}
function initSlider(dataSlider) {
    const imageContainer = document.getElementById("imageContainer");
    const indicatorsContainer = document.getElementById("indicators");
  
    if (!imageContainer || !indicatorsContainer) {
      console.error("Slider elements not found");
      return;
    }
  
    imageContainer.innerHTML = "";
    indicatorsContainer.innerHTML = "";
  
    if (dataSlider.length === 0) {
      console.warn("No data available for slider");
      return;
    }
  
    dataSlider.forEach((elt, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = elt.Image;
      imgElement.alt = `Stack Image ${index + 1}`;
      imgElement.className = `absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000`;
      if (index === 0) imgElement.classList.add("opacity-100");
      imageContainer.appendChild(imgElement);
  
      const indicator = document.createElement("span");
      indicator.className = `w-3 h-3 rounded-full bg-gray-500 ${
        index === 0 ? "bg-white" : ""
      }`;
      indicatorsContainer.appendChild(indicator);
    });
}
  
function updateSlider() {
    if (dataSlider.length === 0) {
      console.warn("No data available for slider update");
      return;
    }
  
    document.querySelectorAll("#imageContainer img").forEach((img, index) => {
      img.classList.toggle("opacity-100", index === currentIndex);
      img.classList.toggle("opacity-0", index !== currentIndex);
    });
  
    const currentImage = data[currentIndex];
    document.getElementById("heading").textContent = currentImage.title1;
  
    document.getElementById(
      "headingLink"
    ).href = `/diia_U/template.html?id=${currentImage._id}?category=opportunities`;
  
    document.querySelectorAll("#indicators span").forEach((indicator, index) => {
      indicator.classList.toggle("bg-white", index === currentIndex);
      indicator.classList.toggle("bg-gray-500", index !== currentIndex);
    });
  
    currentIndex = (currentIndex + 1) % dataSlider.length;
}

async function addNavbar(){
    // let navbar = await fetch("/diia_U/AshutoshDevgotra/navbar.html")
    // let navbarData = await navbar.text()
    // document.getElementById("navbar").innerHTML = navbarData

    // let script = document.createElement("script")
    // script.src = "/diia_U/main/navscript.js"

    // document.body.appendChild(script)
}
async function addFooter(){
    // let footer = await fetch("/diia_U/Divyansh/footer.html")
    // let footerData = await footer.text()
    // document.getElementById("footer").innerHTML = footerData

    // let script = document.createElement("script")
    // script.src = "/diia_U/Divyansh/fscript.js"

    // document.body.appendChild(script)

    // let stylesheet = document.createElement("link")
    // stylesheet.rel = "stylesheet"
    // stylesheet.href = "/diia_U/Divyansh/fstyles.css"
    // document.head.appendChild(stylesheet)

}
async function addToHtmlMous(){
    let national = document.getElementsByClassName("cardContainerNational")[0]
    let industry = document.getElementsByClassName("cardContainerIndustry")[0]
    let international = document.getElementsByClassName("cardContainerInternational")[0]
    let count1 = 0, count2 = 0, count3 = 0;
    try{
        let data = await fetchDataMous()
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].showInSummary === true)
            {
                count1 += 1
                if((data[i].type).toLowerCase() === "indian institutions")
                {
                    national.innerHTML += `<div class = "card relative w-full min-h-[300px] flex flex-col gap-5 rounded-2xl p-5" style = "border: 2px solid #1A4D89">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2 mb-10">
                        <p class="text-blue-700">${(String(data[i].Poc) !== "undefined" && String(data[i].Poc) !== "")?`<i class="fa-solid fa-user mr-4" ></i>POC: `+ data[i].Poc:""}</p>

                        <p class="text-green-700">${(String(data[i].startingDate && String(data[i].startingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar mr-4"></i>Starting Date: `+ data[i].startingDate.substring(0,10):""}</p>

                        <p class="text-red-700">${(String(data[i].endingDate && String(data[i].endingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar-check mr-4"></i>Ending Date: `+ data[i].endingDate.substring(0,10):""}</p>

                        <p class="text-yellow-700">${(String(data[i].location) !== "undefined" && String(data[i].location) !== "")?`<i class="fa-solid fa-location-dot mr-4"></i>Location: ${data[i].location}`:""}</p>
                    </div>
                    <div class="absolute bottom-3 lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center gap-2 text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous" target="_blank">MOU</a>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </div>`
                }

                else if((data[i].type).toLowerCase() === "industry")
                {
                    count2 += 1
                    industry.innerHTML += `<div class = "card relative w-full min-h-[300px] flex flex-col gap-5 rounded-2xl p-5" style = "border: 2px solid #1A4D89">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2 mb-10">
                        <p class="text-blue-700">${(String(data[i].Poc) !== "undefined" && String(data[i].Poc) !== "")?`<i class="fa-solid fa-user mr-4" ></i>POC: `+ data[i].Poc:""}</p>

                        <p class="text-green-700">${(String(data[i].startingDate && String(data[i].startingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar mr-4"></i>Starting Date: `+ data[i].startingDate.substring(0,10):""}</p>

                        <p class="text-red-700">${(String(data[i].endingDate && String(data[i].endingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar-check mr-4"></i>Ending Date: `+ data[i].endingDate.substring(0,10):""}</p>

                        <p class="text-yellow-700">${(String(data[i].location) !== "undefined" && String(data[i].location) !== "")?`<i class="fa-solid fa-location-dot mr-4"></i>Location: ${data[i].location}`:""}</p>
                    </div>
                    <div class="absolute bottom-3 lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center gap-2 text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous" target="_blank">MOU</a>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </div>`
                }

                else if((data[i].type).toLowerCase() == "international institutions")
                {
                    count3 += 1
                    international.innerHTML += `<div class = "card relative w-full min-h-[300px] flex flex-col gap-5 rounded-2xl p-5" style = "border: 2px solid #1A4D89">
                    <p class="text-2xl font-semibold">${data[i].name}</p>
                    <div class="text-lg flex flex-col gap-2 mb-10">
                        <p class="text-blue-700">${(String(data[i].Poc) !== "undefined" && String(data[i].Poc) !== "")?`<i class="fa-solid fa-user mr-4" ></i>POC: `+ data[i].Poc:""}</p>

                        <p class="text-green-700">${(String(data[i].startingDate && String(data[i].startingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar mr-4"></i>Starting Date: `+ data[i].startingDate.substring(0,10):""}</p>

                        <p class="text-red-700">${(String(data[i].endingDate && String(data[i].endingDate) !== "") !== "undefined")?`<i class="fa-solid fa-calendar-check mr-4"></i>Ending Date: `+ data[i].endingDate.substring(0,10):""}</p>

                        <p class="text-yellow-700">${(String(data[i].location) !== "undefined" && String(data[i].location) !== "")?`<i class="fa-solid fa-location-dot mr-4"></i>Location: ${data[i].location}`:""}</p>
                    </div>
                    <div class="absolute bottom-3 lg:w-20 lg:h-8 sm:w-16 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center gap-2 text-white lg:p-3 p-1" style="background: #154378;">
                        <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous" target="_blank">MOU</a>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </div>`
                }
            }
        }

        if(count1 == 0)
        {
            national.innerHTML += `<p class="text-2xl font-bold ">No data Available</p>`
        }
        else if(count2 == 0)
        {
            industry.innerHTML += `<p class="text-2xl font-bold ">No data Available</p>`
        }
        else if(count3 == 0)
        {
            international.innerHTML += `<p class="text-2xl font-bold ">No data Available</p>`
        }
    }
    catch(err)
    {
        console.log("Error in adding MOU's HTML:",err)
    }
}

fetchData();
setInterval(updateSlider, 3000);

window.addEventListener('DOMContentLoaded', async()=>{
    await addToHtmlMous(),
    await addNavbar(),
    await addFooter()
})