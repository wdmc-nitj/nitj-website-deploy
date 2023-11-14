const baseURL = "/api";

// Get the current URL
const currentURL = window.location.href;
// Create a URL object
const url = new URL(currentURL);
// Extract the "id" parameter
const id = url.searchParams.get("id");
console.log(id); // This will log "sample"

fetch(`${baseURL}/club/${id}`)
  .then((response) => response.json())
  .then((data) => {
    const APIdata = data[0];
    console.log("API Response:", APIdata);
    const clubsDoc = document.getElementById("clubs");

    // Conditional rendering for the website link
    const websiteLink = APIdata.clubWebsiteURL
      ? `
  <div class="w-full flex my-4 flex-col items-start mb-5">
    <p class="font2 font-medium text-[28px] lg:text-[32px]">Website link</p>
    <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
  </div>
  <a href="${APIdata.clubWebsiteURL}" class="my-2 rounded-lg p-2 text-white bg-accent hover:bg-blue-500 w-36 h-10">
    Website Link
  </a>`
      : "";

    // Render the website section only if website data exists
    const websiteSection = APIdata.clubWebsiteURL ? websiteLink : "";

    // ojectives 
    let objectivesHTML = "";
    if (APIdata.objective && APIdata.objective.length > 0) {
      APIdata.objective.forEach((objective) => {
        objectivesHTML += `
            <p class="my-2 text-lg font-semibold">
            &#8226; ${objective.description}
            </p>
          `;
      });
    } else {
      objectivesHTML = "<p>No objectives available.</p>";
    }

    // Upcoming events
    let upcomingEventsHTML = "";
    if (APIdata.upcomingEvents && APIdata.upcomingEvents.length > 0) {
      APIdata.upcomingEvents.forEach((event) => {
        upcomingEventsHTML += `
          <p class="my-2 text-red-500 text-base font-semibold">
          &#8226; ${event.description}
          </p>
        `;
      });
    } else {
      upcomingEventsHTML = "<p>No upcoming events available.</p>";
    }

    // Gallery
    let galleryImages = '';
    if (APIdata.clubImages && APIdata.clubImages.length > 0) {
      APIdata.clubImages.forEach((image, index) => {
        if (index % 3 === 0) {
          // Start a new row for every 3 images
          galleryImages += '<div class="container overflow-hidden  mt-4 flex md:flex-row flex-col justify-center">';
        }

        galleryImages += `
          <div class="box overflow-hidden mx-2">
            <img src="${image.link}" alt="Gallery Image" style="height: 200px;" />
          </div>
        `;

        if ((index + 1) % 3 === 0 || (index + 1) === APIdata.clubImages.length) {
          // Close the row after every 3 images or at the end of the loop
          galleryImages += '</div>';
        }
      });
    } else {
      galleryImages = "<p>No gallery images available.</p>";
    }

    // Generate HTML for faculty committee members
    const facultyHTML = generateFacultyHTML(APIdata.facultyCoordinator);
    // Generate HTML for student committee members
    const studentHTML = generateStudentHTML(APIdata.studentCoordinator);

    // Function to generate HTML for faculty committee members
    function generateFacultyHTML(facultyData) {
      let html = "";
      facultyData.forEach((faculty) => {
        html += `
      <div class="rounded-lg border border-gray-200 shadow-md flex flex-row items-center justify-center">
          <img class="m-2 rounded-lg shadow-lg" style="height:150px; width:150px;" src="${faculty.image ? faculty.image : "https://www.iconpacks.net/icons/1/free-user-icon-244-thumb.png"}" alt="faculty-image">
          <div class="flex my-3 ml-2 md:mr-4 mr-2 flex-col items-start justify-start md:gap-1 gap-0">
            <div class="mb-1 md:text-lg text-base font-medium text-gray-900">${faculty.name}</div>
            <div class="text-sm  flex text-gray-500">${faculty.designation}</div>
            <div class="text-sm  flex text-gray-500">${faculty.designationClub}</div>
            <div class="text-sm  md:w-64 w-48 text-start items-center self-center  text-gray-500">${faculty.department}</div>
            <div class="md:text-base text-sm  flex font2  text-sky-500">${faculty.email}</div>
          </div>
      </div>
    `;
      });
      return html;
    }
    // Function to generate HTML for student committee members
    function generateStudentHTML(studentData) {
      let html = "";
      studentData.forEach((student) => {
        html += `
        <div class="rounded-lg border border-gray-200 shadow-md flex flex-row items-center justify-center">
          <img class="m-2 rounded-lg shadow-lg" style="height:150px; width:150px;" src="${student.image ? student.image : "https://www.iconpacks.net/icons/1/free-user-icon-244-thumb.png"}" alt="faculty-image">
          <div class="flex my-3 md:mr-4 mr-2 flex-col items-center justify-start md:gap-1 gap-0">
            <div class="mb-1 md:text-lg text-base font-medium text-gray-900">${student.name}</div>
            <div class="text-sm md:w-64 w-52 text-center items-center self-center  text-gray-500">${student.department}</div>
            <div class="text-sm  flex text-gray-500">${student.year} ${student.designationClub}</div>
            <div class="md:text-base text-sm  flex font2  text-sky-500">${student.email}</div>
            <div class="md:text-base text-sm  flex font2  text-sky-500">${student.phone}</div>
          </div>
      </div>
    `;
      });
      return html;
    }

    // Conditional rendering for social media icons and links
    const youtubeLink = APIdata.youtubeHandleURL
      ? `
    <a class="mr-4 " style="margin-left: 10px;" href="${APIdata.youtubeHandleURL}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" style="color: #ff0000"
    viewBox="0 0 24 24">
    <path
      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
    </a>`
      : "";

    const instagramLink = APIdata.instagramHandleURL
      ? `
    <a class="mr-4" style="margin-left: 10px;" href="${APIdata.instagramHandleURL}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" style="color: #cd30a6"
    viewBox="0 0 24 24">
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
    </a>`
      : "";

    const facebookLink = APIdata.facebookHandleURL
      ? `
    <a class="mr-4" style="margin-left: 10px;" href="${APIdata.facebookHandleURL}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="currentColor" style="color: #1877f2"
    viewBox="0 0 24 24">
    <path
      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
    </a>`
      : "";
    const linkedinLink = APIdata.linkedinHandleURL
      ? `
    <a class="mr-4" style="margin-left: 10px;" href="${APIdata.linkedinHandleURL}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" fill="currentColor" style="color: #0077b5; "
    viewBox="0 0 24 24">
    <path
      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
    </a>`
      : "";

    clubsDoc.innerHTML = `
    <!-- header -->
<div class="titlebg">
  <div class="container flex flex-col justify-center items-start h-[224px] py-[48px]">
    <p class="font2 font-bold text-5xl lg:text-[68px] uppercase text-white leading-[1]">${APIdata.clubName}</p>
  </div>
  <nav class="flex bg-gray-200 py-2 text-black" aria-label="Breadcrumb">
    <ol class="container inline-flex items-center">
      <li class="inline-flex items-center">
        <a href="" class="inline-flex items-center text-sm font-medium hover:text-gray-900">
          <a href="../index.html" class="text-base font-medium ml-2">Home</a>
        </a>
      </li>
      <li aria-current="page">
        <div class="inline-flex items-center">
          <i style="color: rgb(128, 128, 128); font-size: 12px; margin-left: 12px"
            class="fa-solid fa-angle-right ml-2"></i>
          <a href="#" class="text-lg font-medium ml-2">${APIdata.clubName}</a>
        </div>
      </li>
    </ol>
  </nav>
</div>

<!-- Introduction -->
<div class="container">
  <div class="flex flex-col md:items-start lg:items-start items-center gap-10 lg:flex-row justify-left mt-4 lg:mt-8 py-4 lg:py-6 ">
    <!-- Logo -->
    <div>
      <img src="${APIdata.clubLogo}" style="width:100px; height:100px;" alt="Club Logo" />
    </div>
    <!-- Introduction Text -->
    <div id="Introduction" class="w-full  text-lg lg:text-xl text-justify leading-6 lg:leading-7">
      ${APIdata.description}
    </div>
  </div>
</div>

<!-- Website Link -->
<div class="container">
  ${websiteSection}
</div>

<!-- Club Objective -->
<div class="container md:mt-16 mt-8">
  <div class="w-full flex flex-col items-start md:mb-5 mb-2">
    <p class="font2 font-medium text-2xl lg:text-3xl">Objective</p>
    <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
    </div>
  <div class="w-full text-lg lg:text-xl text-justify mt-4 leading-6 lg:leading-7">
    ${objectivesHTML}
  </div>
</div>

<!-- Gallery -->
<div class="md:mt-16 mt-4">
  <div class=" container w-full flex flex-col items-start md:mb-5 mb-2">
    <p class="font2 font-medium text-2xl lg:text-3xl">Gallery</p>
    <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
    </div>
    <div class="flex flex-col md:h-[65vh] h-full w-full">
      ${galleryImages}
    </div>
</div>
<!-- Gallery -->

<!-- upcoming events -->
<div id="quality-policy" class="md:mt-16 mt-4 container">
  <p class="font2 font-medium text-2xl lg:text-3xl">Upcoming Events</p>
  <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
</div>
<div class="flex container flex-col md:gap-4 mt-4 gap-2">
  ${upcomingEventsHTML}
</div>
<!-- upcoming events -->

<!-- Committee -->
<div id="quality-policy" class="md:mt-16 mt-4 container">
  <p class="font2 font-medium text-2xl lg:text-[32px]">Committee</p>
  <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
  <div class="flex flex-row items-center justify-center md:mt-0 mt-4 gap-8 ">
    <div
      class="group w-1/3 transition delay-100 duration-300 hover:cursor-pointer hover:shadow-xl hover:bg-accent hover:shadow-accent hover:scale-110 flex flex-col space-y-4 items-center justify-center  h-full px-3 py-5 bg-white shadow shadow-gray-400 rounded-xl"
      onclick="facultyClick()">
      <p class="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
        Faculty
      </p>
    </div>
    <div
      class="group w-1/3  transition delay-100 duration-300 hover:cursor-pointer hover:shadow-xl hover:bg-accent hover:shadow-accent hover:scale-110 flex flex-col space-y-4 items-center justify-center  h-full px-3 py-5 shadow shadow-gray-400 rounded-xl"
      onclick="studentClick()">
      <p class="group-hover:text-white text-lg lg:text-xl whitespace-nowrap text-center text-dark-purple uppercase">
        Student
      </p>
    </div>
  </div>

  <div id="facultyCommittee" style="display: flex;" class="flex mt-6 md:flex-row flex-col items-center justify-center flex-wrap gap-4">
    ${facultyHTML}
  </div>
  <div id="studentCommittee" style="display: none;" class="flex  mt-6 md:flex-row flex-col items-center justify-center flex-wrap gap-4">
    ${studentHTML}
  </div>
</div>

<!-- Social Media Links -->
<div class="container md:mt-16 mt-4">
  <div class="w-full flex flex-col items-start">
    <p class="font2 font-medium text-2xl lg:text-3xl">Social Media Links</p>
    <div class="bg-accent w-full lg:w-[111px] h-[1px] lg:h-[3px]"></div>
  </div>
  <div class="flex my-4 items-center">
    ${youtubeLink}
    ${instagramLink}
    ${facebookLink}
    ${linkedinLink}
  </div>
</div>
    `;
  });