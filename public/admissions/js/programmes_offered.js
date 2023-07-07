let data_url = "/api";
//minorprogrammes in ug page

fetch('${data_url}/admissions/minorProgramme/visible')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("minor_degrees");
    data.forEach((update) => {
      const ugupdate = document.createElement("tr");
      ugupdate.innerHTML = `
 
      <td style="width:272px" class="px-4 py-2 border border-gray-300">
          <p >${update.nameOfProgramme}</p>
      </td>
      <td style="width:272px" class="px-4 py-2 border border-gray-300">
          <p >${update.availableProgrammes}</p>
      </td>
  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });


  //ug page programmes
  fetch('${data_url}/admissions/majorProgramme/visible?category=Undergraduate%20Programme')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("ug_programmes");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });


  //mtech ccmt 
  fetch('  ${data_url}/admissions/majorProgramme/visible?category=Post%20Graduate%20and%20Research%20Programme&subCategory=CCMT')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("mtech_programme_ccmt");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

  //self sponsored 
 
  fetch('  ${data_url}/admissions/majorProgramme/visible?category=Post%20Graduate%20and%20Research%20Programme&subCategory=Self-Sponsored')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("mtech_programme_Self-Sponsored");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

  //msc
  fetch('  ${data_url}/admissions/majorProgramme/visible?category=Post%20Graduate%20and%20Research%20Programme&subCategory=MSc')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("programme_msc");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

  //mba
  fetch('  ${data_url}/admissions/majorProgramme/visible?category=Post%20Graduate%20and%20Research%20Programme&subCategory=MBA')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("programme_mba");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

  //Pg diplomma in management

  fetch('  ${data_url}/admissions/majorProgramme/visible?category=Post%20Graduate%20and%20Research%20Programme&subCategory=PG%20Diploma%20in%20Management')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("PG_Diploma_in_Management");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });


  //PG Diploma in Engineering Programme

  
  fetch('${data_url}/admissions/majorProgramme/visible?category=PG%20Diploma%20in%20Engineering%20Programme')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("PG_Diploma_in_Engineering");
    data.forEach((update) => {
      const ugupdate = document.createElement("li");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });

  //phd
  fetch('${data_url}/admissions/majorProgramme/visible?category=PhD%20Programme')
  .then((response) => response.json())
  .then((data) => {
    const ugupdates = document.getElementById("phd_programme");
    data.forEach((update) => {
      const ugupdate = document.createElement("div");
      ugupdate.innerHTML = `
 
      ${update.nameOfProgrammeOrComment}  ${update.new ? `<div class="inline-block"><img src="https://v1.nitj.ac.in//images/New.gif"></div>` : ``}

  
      `;
      ugupdates.appendChild(ugupdate);
    });
  });