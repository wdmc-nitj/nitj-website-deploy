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
    else if (update.defaultTabName === "faculty-contract" && slug[slug.length - 1] !== "research") {
      const facultycontract = document.getElementById("facultycontractButton");
      facultycontract.click()
    }
    else if (update.defaultTabName === "nonFaculty" && slug[slug.length - 1] !== "research") {
      const nonfaculty = document.getElementById("nonfacultyButton");
      nonfaculty.click()
    }
    else if (update.defaultTabName === "nonFaculty-contract" && slug[slug.length - 1] !== "research") {
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
fetch(`${data_url}` + `/news/getNewsByType?type=jobsFaculty`)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("faculty");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.innerHTML = `
  <span class="font-bold text-4xl">.</span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>

    `;
      faculty.appendChild(list);
    });
  });

fetch(`${data_url}` + `/news/getNewsByType?type=jobsNonFaculty`)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("nonFaculty");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.innerHTML = `
  <span class="font-bold text-4xl">.</span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>

    `;
      faculty.appendChild(list);
    });
  });

fetch(
  `${data_url}` + `/news/getNewsByType?type=jobsFacultyContract`
)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("faculty-contract");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.innerHTML = `
  <span class="font-bold text-4xl">.</span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>

    `;
      faculty.appendChild(list);
    });
  });

fetch(
  `${data_url}` +
  `/news/getNewsByType?type=jobsNonFacultyContract`
)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("nonFaculty-contract");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.innerHTML = `
  <span class="font-bold text-4xl">.</span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>

    `;
      faculty.appendChild(list);
    });
  });

fetch(`${data_url}` + `/news/getNewsByType?type=researchjobs`)
  .then((response) => response.json())
  .then((data) => {
    const faculty = document.getElementById("researchJob");
    data.forEach((update) => {
      const list = document.createElement("li");
      list.innerHTML = `
  <span class="font-bold text-4xl">.</span>
  <a
  href=${update.link}
  class="hover:text-[#FF6600]"
>
${update.title}
 </a
>

    `;
      faculty.appendChild(list);
    });
  });


