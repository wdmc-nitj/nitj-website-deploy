let data_url = "/api";
fetch(`${data_url}` + "/admissions/updates/get?visible=visible&degree=BTECH")
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("ug-updates");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
    <div class="flex">
      <span class="bg-[#0369A1] ml-[2%]">|</span>
      <div class="w-[80%] mx-2">
        <a
        href='${update.link}'
          class="hover:text-orange-600 inline"
        >
        ${update.title}
        </a>
        </div>
        ${update.new
          ? ` 
          <div>
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
            <span class="text-base material-symbols-outlined text-accent-orange">
              auto_awesome
            </span>
            <p class="font-bold uppercase text-accent-orange">
              New
            </p>
          </span>
</div>`
          : `
            <div>
          </div> `
        }
  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

fetch(
  `${data_url}` + "/admissions/updates/get?visible=visible&degree=MTECH-CCMT"
)
  .then((response) => response.json())
  .then((data) => {
    const mtechupdates = document.getElementById("mtech-ccmt-updates");
    data.forEach((update) => {
      const mtechupdate = document.createElement("li");
      mtechupdate.innerHTML = `
      <div class="flex">
        <span class="bg-[#0369A1] ml-[2%]">|</span>
        <div class="w-[80%] mx-2">
          <a
          href='${update.link}'
            class="hover:text-orange-600 inline"
          >
          
        ${update.title}
        </a>
        </div>
        ${update.new
          ? ` 
           
            <div>
            <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                        <span class="text-base material-symbols-outlined text-accent-orange">
                          auto_awesome
                        </span>
                        <p class="font-bold uppercase text-accent-orange">
                          New
                        </p>
                      </span>
            </div>`
          : `
                        <div>
                      </div>`
        }
      </div>
    
        `;
      mtechupdates.appendChild(mtechupdate);
    });
  });

fetch(
  `${data_url}` + "/admissions/updates/get?visible=visible&degree=MTECH-SELF"
)
  .then((response) => response.json())
  .then((data) => {
    const mtechselfupdates = document.getElementById("mtech-self-updates");
    data.forEach((update) => {
      const mtechselfupdate = document.createElement("li");
      mtechselfupdate.innerHTML = `
        <div class="flex">
          <span class="bg-[#0369A1] ml-[2%]">|</span>
          <div class="w-[80%] mx-2">
            <a
            href='${update.link}'
              class="hover:text-orange-600 inline"
            >
            
          ${update.title}
          </a>
          </div>
          ${update.new
          ? ` 
             
          <div>
          <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                      <span class="text-base material-symbols-outlined text-accent-orange">
                        auto_awesome
                      </span>
                      <p class="font-bold uppercase text-accent-orange">
                        New
                      </p>
                    </span>
          </div>`
          : `
                      <div>
                    </div>`
        }
        </div>
      
          `;
      mtechselfupdates.appendChild(mtechselfupdate);
    });
  });

fetch(`${data_url}` + "/admissions/updates/get?visible=visible&degree=MSC")
  .then((response) => response.json())
  .then((data) => {
    const msc_updates = document.getElementById("msc-updates");
    data.forEach((update) => {
      const mscupdate = document.createElement("li");
      mscupdate.innerHTML = `
          <div class="flex">
          <span class="bg-[#0369A1] ml-[2%]">|</span>
          <div class="w-[80%] mx-2">
            <a
             href='${update.link}'
              class="hover:text-orange-600 inline"
            >
              
            ${update.title}
            </a>
            </div>
            ${update.new
          ? ` 
               
          <div>
          <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                      <span class="text-base material-symbols-outlined text-accent-orange">
                        auto_awesome
                      </span>
                      <p class="font-bold uppercase text-accent-orange">
                        New
                      </p>
                    </span>
          </div>`
          : `
                      <div>
                    </div>`
        }
          </div>
        
            `;
      msc_updates.appendChild(mscupdate);
    });
  });

fetch(`${data_url}` + "/admissions/updates/get?visible=visible&degree=MBA")
  .then((response) => response.json())
  .then((data) => {
    const mba_updates = document.getElementById("mba-updates");
    data.forEach((update) => {
      const mbaupdate = document.createElement("li");
      mbaupdate.innerHTML = `
            <div class="flex">
            <span class="bg-[#0369A1] ml-[2%]">|</span>
            <div class="w-[80%] mx-2">
              <a
               href='${update.link}'
                class="hover:text-orange-600 inline"
              > 
              ${update.title}
              </a>
              </div>
              ${update.new
          ? ` 
                 
          <div>
          <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                      <span class="text-base material-symbols-outlined text-accent-orange">
                        auto_awesome
                      </span>
                      <p class="font-bold uppercase text-accent-orange">
                        New
                      </p>
                    </span>
          </div>`
          : `
                      <div>
                    </div> `
        }
            </div>
          
              `;
      mba_updates.appendChild(mbaupdate);
    });
  });

fetch(`${data_url}` + "/admissions/updates/get?visible=visible&degree=PHD")
  .then((response) => response.json())
  .then((data) => {
    const phd_updates = document.getElementById("phd-updates");
    data.forEach((update) => {
      const phdupdate = document.createElement("li");
      phdupdate.innerHTML = `
              <div class="flex">
              <span class="bg-[#0369A1] ml-[2%]">|</span>
              <div class="w-[80%] mx-2">
                <a
                 href='${update.link}'
                  class="hover:text-orange-600 inline"
                >
                ${update.title}
                </a>
                </div>
                ${update.new
          ? ` 
                   
          <div>
          <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                      <span class="text-base material-symbols-outlined text-accent-orange">
                        auto_awesome
                      </span>
                      <p class="font-bold uppercase text-accent-orange">
                        New
                      </p>
                    </span>
          </div>`
          : `
                      <div>
                    </div>`
        }
              </div>
            
                `;
      phd_updates.appendChild(phdupdate);
    });
  });

// bscbed
  fetch(`${data_url}` + "/admissions/updates/get?visible=visible&degree=BSC-BED")
  .then((response) => response.json())
  .then((data) => {
    const bscbed_updates = document.getElementById("bscbed-updates");
    console.log(bscbed_updates)
    data.forEach((update) => {
      const bscbedupdate = document.createElement("li");
      bscbedupdate.innerHTML = `
              <div class="flex">
              <span class="bg-[#0369A1] ml-[2%]">|</span>
              <div class="w-[80%] mx-2">
                <a
                 href='${update.link}'
                  class="hover:text-orange-600 inline"
                >
                ${update.title}
                </a>
                </div>
                ${update.new
          ? ` 
                   
          <div>
          <span id="new-tag" class="flex text-base text-accent-orange space-x-2">
                      <span class="text-base material-symbols-outlined text-accent-orange">
                        auto_awesome
                      </span>
                      <p class="font-bold uppercase text-accent-orange">
                        New
                      </p>
                    </span>
          </div>`
          : `
                      <div>
                    </div>`
        }
              </div>
            
                `;
      bscbed_updates.appendChild(bscbedupdate);
    });
  });


// important links
fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=BTECH")
  .then((response) => response.json())
  .then((data) => {
    const important_links = document.getElementById("important_links");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
                <li class="text-[12px] px-2">
                <a
                  href=${update.link}
                  target="_blank"
                  class="ml-[3%] hover:text-orange-600"
                  >${update.title}</a
                >
                <hr class="border-1 border-gray-300" />
              </li>
              
                  `;
      important_links.appendChild(important_link);
    });
  })

fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=MTECH_CCMT")
  .then((response) => response.json())
  .then((data) => {
    const important_links2 = document.getElementById("important_links2");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
      <li class="text-[12px] px-2">
      <a
        href=${update.link}
        target="_blank"
        class="ml-[3%] hover:text-orange-600"
        >${update.title}</a
      >
      <hr class="border-1 border-gray-300" />
    </li>
                
                    `;
      important_links2.appendChild(important_link);
    });
  });

fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=MTECH_SS")
  .then((response) => response.json())
  .then((data) => {
    const important_links3 = document.getElementById("important_links3");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
      <li class="text-[12px] px-2">
      <a
        href=${update.link}
        target="_blank"
        class="ml-[3%] hover:text-orange-600"
        >${update.title}</a
      >
      <hr class="border-1 border-gray-300" />
    </li>
                  
                      `;
      important_links3.appendChild(important_link);
    });
  });

fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=MSC")
  .then((response) => response.json())
  .then((data) => {
    const important_links4 = document.getElementById("important_links4");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
      <li class="text-[12px] px-2">
      <a
        href=${update.link}
        target="_blank"
        class="ml-[3%] hover:text-orange-600"
        >${update.title}</a
      >
      <hr class="border-1 border-gray-300" />
    </li>
                    
                        `;
      important_links4.appendChild(important_link);
    });
  });

fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=MBA")
  .then((response) => response.json())
  .then((data) => {
    const important_links5 = document.getElementById("important_links5");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
      <li class="text-[12px] px-2">
      <a
        href=${update.link}
        target="_blank"
        class="ml-[3%] hover:text-orange-600"
        >${update.title}</a
      >
      <hr class="border-1 border-gray-300" />
    </li>
                      
                          `;
      important_links5.appendChild(important_link);
    });
  });

fetch(`${data_url}` + "/admissions/links/get?visible=visible&degree=PHD")
  .then((response) => response.json())
  .then((data) => {
    const important_links6 = document.getElementById("important_links6");

    data.forEach((update) => {
      const important_link = document.createElement("li");
      important_link.innerHTML = `
      <li class="text-[12px] px-2">
      <a
        href=${update.link}
        target="_blank"
        class="ml-[3%] hover:text-orange-600"
        >${update.title}</a
      >
      <hr class="border-1 border-gray-300" />
    </li>
                        
                            `;
      important_links6.appendChild(important_link);
    });
  });

fetch(`${data_url}` + "/admissions/helplines/get?visible=visible&degree=BTECH")
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplines");
    data.forEach((update) => {
      const helpline = document.createElement("li");
      helpline.innerHTML = `
                          <li class="ppx-1 mt-1 mb-4">
            <div class="lg:basis-3/4">
                   
            <p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
            ${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
            <div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
            <div class="w-[100%] flex flex-col gap-[4px]">
            ${update.email  ? ` <div class="flex flex-row">
                <p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
               <p class="">: &nbsp; &nbsp;</p>
                <p>${update.email}</p>
           </div>` : ``}
           <div class="flex flex-row">
               <p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
               <p class="">: &nbsp; &nbsp;</p>
               <p>${update.contactNumbers}</p>
           </div>
           ${update.languages.length ?    `<div class="flex flex-row">
          <p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
               <p class="">: &nbsp; &nbsp;</p>
                <p>${update.languages}</p>
           </div>` : ``}
           ${update.timings.length ?    `<div class="flex flex-row">
           <p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
                <p class="">: &nbsp; &nbsp;</p>
                 <p>${update.timings}</p>
            </div>` : ``}
          </div>
   </div>


                        </li>
                        
                            `;
      helplines.appendChild(helpline);
    });
  });

fetch(
  `${data_url}` + "/admissions/helplines/get?visible=visible&degree=MTECH-CCMT"
)
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplinesmtechccmt");
 console.log(helplines)
    data.forEach((update) => {
      console.log(update);
      const helpline = document.createElement("li");
      helpline.innerHTML = `
      <li class="ppx-1 mt-1 mb-4">
<div class="lg:basis-3/4">

<p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
<div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
<div class="w-[100%] flex flex-col gap-[4px]">
${update.email  ? ` <div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.email}</p>
</div>` : ``}
<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.contactNumbers}</p>
</div>
${update.languages.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.languages}</p>
</div>` : ``}
${update.timings.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.timings}</p>
</div>` : ``}
</div>
</div>


    </li>
    
        `;
      helplines.appendChild(helpline);
     
    });
  });



fetch(
  `${data_url}` + "/admissions/helplines/get?visible=visible&degree=MTECH-SELF"
)
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplinesmtechss");
    data.forEach((update) => {
      const helpline = document.createElement("li");
      helpline.innerHTML = `
      <li class="ppx-1 mt-1 mb-4">
<div class="lg:basis-3/4">

<p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
<div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
<div class="w-[100%] flex flex-col gap-[4px]">
${update.email  ? ` <div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.email}</p>
</div>` : ``}
<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.contactNumbers}</p>
</div>
${update.languages.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.languages}</p>
</div>` : ``}
${update.timings.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.timings}</p>
</div>` : ``}
</div>
</div>


    </li>
    
        `;
      helplines.appendChild(helpline);
 
    });
  });

fetch(`${data_url}` + "/admissions/helplines/get?visible=visible&degree=MSC")
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplinesmsc");

    data.forEach((update) => {
      const helpline = document.createElement("li");
      helpline.innerHTML = `
                          <li class="ppx-1 mt-1 mb-4">
            <div class="lg:basis-3/4">
                   
            <p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
            ${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
            <div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
            <div class="w-[100%] flex flex-col gap-[4px]">
            ${update.email  ? ` <div class="flex flex-row">
                <p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
               <p class="">: &nbsp; &nbsp;</p>
                <p>${update.email}</p>
           </div>` : ``}
           <div class="flex flex-row">
               <p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
               <p class="">: &nbsp; &nbsp;</p>
               <p>${update.contactNumbers}</p>
           </div>
           ${update.languages.length ?    `<div class="flex flex-row">
          <p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
               <p class="">: &nbsp; &nbsp;</p>
                <p>${update.languages}</p>
           </div>` : ``}
           ${update.timings.length ?    `<div class="flex flex-row">
           <p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
                <p class="">: &nbsp; &nbsp;</p>
                 <p>${update.timings}</p>
            </div>` : ``}
          </div>
   </div>


                        </li>
                        
                            `;
      helplines.appendChild(helpline);
    });
  });

fetch(`${data_url}` + "/admissions/helplines/get?visible=visible&degree=MBA")
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplinesmba");

    data.forEach((update) => {
      const helpline = document.createElement("li");
      helpline.innerHTML = `
      <li class="ppx-1 mt-1 mb-4">
<div class="lg:basis-3/4">

<p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
<div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
<div class="w-[100%] flex flex-col gap-[4px]">
${update.email  ? ` <div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.email}</p>
</div>` : ``}
<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.contactNumbers}</p>
</div>
${update.languages.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.languages}</p>
</div>` : ``}
${update.timings.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.timings}</p>
</div>` : ``}
</div>
</div>


    </li>
    
        `;
      helplines.appendChild(helpline);
    });
  });

fetch(`${data_url}` + "/admissions/helplines/get?visible=visible&degree=PHD")
  .then((response) => response.json())
  .then((data) => {
    const helplines = document.getElementById("helplinesphd");

    data.forEach((update) => {
      const helpline = document.createElement("li");
      helpline.innerHTML = `
      <li class="ppx-1 mt-1 mb-4">
<div class="lg:basis-3/4">

<p class="font2 font-semibold text-[26px] lg:text-[1.4rem] leading-[1.3] normal-case">${update.name}</p>
${update.designation ?   ` <p class="text-gray-400 text-[12px] lg:text-[16px]">${update.designation}</p>` : ``}
<div class="bg-accent w-[100%] h-[3px] mb-4 mt-2"></div>
<div class="w-[100%] flex flex-col gap-[4px]">
${update.email  ? ` <div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 text-justify font-semibold">Email</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.email}</p>
</div>` : ``}
<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Phone</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.contactNumbers}</p>
</div>
${update.languages.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Languages</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.languages}</p>
</div>` : ``}
${update.timings.length ?    `<div class="flex flex-row">
<p class="basis-3/12 md:basis-1/12 font-semibold">Timings</p>
<p class="">: &nbsp; &nbsp;</p>
<p>${update.timings}</p>
</div>` : ``}
</div>
</div>


    </li>
    
        `;
      helplines.appendChild(helpline);
    });
  });
