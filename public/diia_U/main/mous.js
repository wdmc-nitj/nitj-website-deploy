/*MOUs*/
let sectionContainer = document.getElementsByClassName("sectionContainer");
// for(let i of sectionContainer)
// {
//     i.addEventListener("click", () => {
//         window.open("/diia_U/template.html?id=66db5b05fc2d772903adefc0?category=news-section","_blank")
//     })
// }

function sliderMOU(section, dir, count) {
  // console.log("slider:",section[0].classList)
  // let visible = 0
  // section[0].style.opacity = 1;

  section.addEventListener("wheel", (event) => {
    if (event.deltaY === 0) {
      event.preventDefault();
    } // to prevent default scrolling
  });

  let scrolled = 0;
  setInterval(() => {
    // console.log("Total scroll req",(count-1)*section.clientWidth)
    if (dir) {
      if (scrolled < (count - 1) * section.clientWidth) {
        section.scrollBy({
          left: section.clientWidth,
          behavior: "smooth",
        });
        scrolled += section.clientWidth;
        // console.log("scrolld left",scrolled)
      } else {
        // console.log("Scrolled  right")
        section.scrollBy({
          left: -scrolled,
          behavior: "smooth",
        });
        scrolled = 0;
      }
    } else {
      // console.log("indutry scroll right")
      if (scrolled < (count - 1) * section.clientWidth) {
        section.scrollBy({
          left: -section.clientWidth,
          behavior: "smooth",
        });
        scrolled += section.clientWidth;
        // console.log(scrolled)
      } else {
        section.scrollBy({
          left: scrolled,
          behavior: "smooth",
        });
        scrolled = 0;
      }
    }
  }, 5000);
}

function applyEffectToSection() {
  let section1 = document.getElementsByClassName("section1");
  let section2 = document.getElementsByClassName("section2");
  let section3 = document.getElementsByClassName("section3");

  if (window.outerWidth <= 425) {
    let elements2 = document.getElementsByClassName("section2");
    for (let i = 0; i < elements2.length; i++) {
      // elements1[0].parentNode.insertBefore(elements1[3],elements1[1])
      elements2[i].childNodes[0].parentNode.insertBefore(
        elements2[i].childNodes[3],
        elements2[i].childNodes[0]
      );
      // elements2[0].parentNode.insertBefore(elements2_2[3],elements2_2[1])
      // elements3[0].parentNode.insertBefore(elements3[3],elements3[1])
      // console.log(elements2[i].childNodes)
    }

    let background = document.getElementsByClassName("background");
    console.log("MOU", background);
    for (let i of background) {
      i.classList.add("h-[200px]");
      // console.log(i)
    }
  }
}

async function fetchDataMous() {
  try {
    const res = await fetch("/api/diia/mous");
    if (!res.ok) {
      throw new Error(`Status:${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("failed:", err);
  }
}

async function addToHtmlMous() {
  let national = document.getElementsByClassName("national")[0];
  let industry = document.getElementsByClassName("industry")[0];
  let international = document.getElementsByClassName("international")[0];
  let count1 = 0,
    count2 = 0,
    count3 = 0;
  try {
    let data = await fetchDataMous();
    for (let i = 0; i < data.length; i++) {
      // console.log("national")
      if (
        data[i].showInSlider === true &&
        (data[i].Image !== undefined || data[i].Image == "")
      ) {
        if (data[i].type.toLowerCase() == "indian institutions") {
          count1 += 1;
          national.innerHTML += `<div class="section1 flex flex-none w-full gap-5 sm:flex-row flex-col">
                        <div class="background w-full relative rounded-xl" 
                                                    style = "background: url(${
                                                      data[i].Image
                                                    });
                                                            background-size: cover; 
                                                            background-position: center; 
                                                            background-repeat: no-repeat;" >
                            <div class="absolute bottom-0 w-full" >
                                <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${
                                  String(data[i].location) !== "undefined"
                                    ? data[i].location
                                    : ""
                                }</p>
                            </div>
                        </div>
                        <div class="relative card sm:w-1/2 flex flex-col p-6 rounded-2xl lg:gap-7  gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%); ">
                            <p class="bg-white rounded-3xl w-fit h-5 text-xs p-3 flex items-center justify-center font-semibold" style="color: #0056b3;">Indian Institutions</p>
                            <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                            <p class="lg:text-2xl md:text-sm text-sm">${
                              data[i].name
                            }</p>
                            <p class="lg:text-sm text-xs lg:h-full h-8 overflow-clip">${data[
                              i
                            ].description.substring(0, 200)}...</p>
                            <div class="lg:w-24 lg:h-8 sm:w-20 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                                <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous" target="_blank" class="">Read More</a>
                            </div>
                        </div>
                    </div>`;
        } else if (data[i].type.toLowerCase() == "industry") {
          count2 += 1;
          industry.innerHTML += `<div class=" section2 flex flex-none w-full gap-5 sm:flex-row flex-col">
                        <div class="relative card sm:w-1/2 flex flex-col p-6 rounded-2xl lg:gap-7 gap-5 transition-all duration-400 ease-in-out-expo scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                            <p class="bg-white rounded-3xl w-fit h-5 text-xs p-3 flex items-center justify-center font-semibold" style="color: #0056b3;">Industry Partners</p>
                            <img src="Student Center (1).png" alt="" class="absolute top-5 right-5 h-6">
                            <p class="lg:text-2xl md:text-sm text-sm">${
                              data[i].name
                            }</p>
                            <p class="lg:text-sm text-xs lg:h-full h-12 overflow-clip">${data[
                              i
                            ].description.substring(0, 200)}...</p>
                            <div class="lg:w-24 lg:h-8 sm:w-20 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                                <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous"  target="_blank" class="">Read More</a>
                            </div>
                        </div>
                        <div class="background w-full relative rounded-xl" 
                                                    style = "background: url(${
                                                      data[i].Image
                                                    });
                                                            background-size: cover; 
                                                            background-position: center; 
                                                            background-repeat: no-repeat; " >
                            <div class="absolute bottom-0 w-full">
                                <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${
                                  String(data[i].location) !== "undefined"
                                    ? data[i].location
                                    : ""
                                }</p>
                            </div>
                        </div>
                    </div>`;
        } else if (data[i].type.toLowerCase() == "international institutions") {
          count3 += 1;
          international.innerHTML += `<div class=" section3 flex flex-none w-full gap-5 sm:flex-row flex-col">
                        <div class="background w-full relative rounded-xl" 
                                                    style = "background: url(${
                                                      data[i].Image
                                                    });
                                                            background-size: cover; 
                                                            background-position: center; 
                                                            background-repeat: no-repeat; " >
                            <div class="absolute bottom-0 w-full">
                                <p class = "text-white text-center lg:text-2xl md:text-xl text-sm font-semibold rounded-xl"  style="background: linear-gradient(180deg, rgba(53, 99, 154, 0.05) 0%, rgba(53, 99, 154, 0.82));">${
                                  String(data[i].location) !== "undefined"
                                    ? data[i].location
                                    : ""
                                }</p>
                            </div>
                        </div>
                        <div class="relative card sm:w-1/2 flex flex-col p-6 rounded-2xl lg:gap-7 gap-5   scrollbar-custom text-white" style="background: linear-gradient(87.67deg, rgba(255, 255, 255, 0.2686) -84.93%, rgba(153, 153, 153, 0.1598) 203.85%);">
                            <p class="bg-white rounded-3xl w-fit h-5 text-xs p-3 flex items-center justify-center font-semibold" style="color: #0056b3;">Global Partners</p>
                            <img src="img/Edit File.png" alt="" class="absolute top-5 right-5 h-6">
                            <p class="lg:text-2xl md:text-sm text-sm">${
                              data[i].name
                            }</p>
                            <p class="lg:text-sm text-xs lg:h-full h-12 overflow-clip">${data[
                              i
                            ].description.substring(0, 200)}...</p>
                            <div class="lg:w-24 lg:h-8 sm:w-20 sm:h-5 lg:rounded-lg sm:rounded-sm rounded-md text-xs w-20 h-8 font-semibold flex justify-center items-center text-white lg:p-3 p-1" style="background: #154378;">
                                <a href="/diia_U/template.html?id=${
                                  data[i]._id
                                }?category=mous"  target="_blank" class="">Read More</a>
                            </div>
                        </div>
                    </div>`;
        }
      }
    }
  } catch (err) {
    console.log("Error in adding MOU's HTML:", err);
  }
  // console.log(count1,"count1")
  industry.scrollBy({
    left: (count2 - 1) * industry.clientWidth,
    behavior: "smooth",
  });
  sliderMOU(national, 1, count1);
  sliderMOU(industry, 0, count2);
  sliderMOU(international, 1, count3);
}

// window.onload = async function() {
//     await addToHtmlMous(),
//     applyEffectToSection()
// }
window.addEventListener("DOMContentLoaded", async () => {
  await addToHtmlMous(), applyEffectToSection();
});
