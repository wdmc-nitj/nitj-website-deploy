let data_url = "/api";
let slug = window.location.href.match(/[^#]+/g)
console.log(slug);
if (slug[slug.length - 1] == "research") {

  const resJob = document.getElementById("researchButton");
  resJob.click()
}


fetch(`${data_url}` + `/recruitments/updates/defaultTab`)
  .then((response) => response.json())
  .then((data) => {
    const update = data;

    if (update.defaultTabName === "research") {
      const resJob = document.getElementById("researchButton");
      resJob.click()
    }
    else if (update.defaultTabName === "facultyContract" && slug[slug.length - 1] !== "research") {
      const facultycontract = document.getElementById("facultycontractButton");
      facultycontract.click()
    }
    else if (update.defaultTabName === "nonFaculty" && slug[slug.length - 1] !== "research") {
      const nonfaculty = document.getElementById("nonfacultyButton");
      nonfaculty.click()
    }
    else if (update.defaultTabName === "nonFacultyContract" && slug[slug.length - 1] !== "research") {
      const nonfacultycontract = document.getElementById("nonfacultycontractButton");
      nonfacultycontract.click()
    }
    else if(update.defaultTabName === "faculty" && slug[slug.length - 1] !== "research"){
      const faculty = document.getElementById("facultyButton");
      faculty.click()
    };
  });
window.onhashchange = function () {
  let slug = window.location.href.match(/[^#]+/g)
  console.log(slug)
  if (slug[slug.length - 1] == "research") {

    const resJob = document.getElementById("researchButton");
    resJob.click()
  }

}
fetch(`${data_url}` + `/recruitments/updates/categorised?category=faculty`)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("faculty");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.classList.add("flex");
      list.classList.add("py-2");
      list.innerHTML = `
      <span class="mx-2 ">
      <i
      class="fa-solid fa-angle-right text-[16px] "></i>
      </span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>


${update.new
  ? ` 
 
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
    <span class="text-base material-symbols-outlined text-accent-orange">
      auto_awesome
    </span>
    <p class="font-bold uppercase text-accent-orange">
      New
    </p>
  </span>
`
  : `
    <span>
  </span> `
}
    `;
      faculty.appendChild(list);
    });
  });

fetch(`${data_url}` + `/recruitments/updates/categorised?category=nonFaculty`)

  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("nonFaculty");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.classList.add("flex");
      list.classList.add("py-2");
     
     
      list.innerHTML = `
      <span class="mx-2 ">
      <i
      class="fa-solid fa-angle-right text-[16px] "></i>
      </span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>


${update.new
  ? ` 
 
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
    <span class="text-base material-symbols-outlined text-accent-orange">
      auto_awesome
    </span>
    <p class="font-bold uppercase text-accent-orange">
      New
    </p>
  </span>
`
  : `
    <span>
  </span> `
}
    `;
      faculty.appendChild(list);
    });
  });

fetch(
  `${data_url}` + `/recruitments/updates/categorised?category=facultyContract`

)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("faculty-contract");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.classList.add("flex");
      list.classList.add("py-2");
      list.innerHTML = `
      <span class="mx-2 ">
      <i
      class="fa-solid fa-angle-right text-[16px] "></i>
      </span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>


${update.new
  ? ` 
 
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
    <span class="text-base material-symbols-outlined text-accent-orange">
      auto_awesome
    </span>
    <p class="font-bold uppercase text-accent-orange">
      New
    </p>
  </span>
`
  : `
    <span>
  </span> `
}
    `;
      faculty.appendChild(list);
    });
  });

fetch(
  `${data_url}` +
  `/recruitments/updates/categorised?category=nonFacultyContract`

)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("nonFaculty-contract");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.classList.add("flex");
      list.classList.add("py-2");
      list.innerHTML = `
      <span class="mx-2 ">
      <i
      class="fa-solid fa-angle-right text-[16px] "></i>
      </span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>


${update.new
  ? ` 
 
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
    <span class="text-base material-symbols-outlined text-accent-orange">
      auto_awesome
    </span>
    <p class="font-bold uppercase text-accent-orange">
      New
    </p>
  </span>
`
  : `
    <span>
  </span> `
}
    `;
      faculty.appendChild(list);
    });
  });

fetch(`${data_url}` + `/recruitments/updates/categorised?category=research`)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("researchJob");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.classList.add("flex");
      list.classList.add("py-2");
      list.innerHTML = `
      <span class="mx-2 ">
      <i
      class="fa-solid fa-angle-right text-[16px] "></i>
      </span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>


${update.new
  ? ` 
 
<span id="new-tag" class="flex text-base text-accent-orange space-x-2">
    <span class="text-base material-symbols-outlined text-accent-orange">
      auto_awesome
    </span>
    <p class="font-bold uppercase text-accent-orange">
      New
    </p>
  </span>
`
  : `
    <span>
  </span> `
}
    `;
      faculty.appendChild(list);
    });
  });


