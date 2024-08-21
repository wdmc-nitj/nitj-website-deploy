const getevents = `/api/eventsCalendar/events`;
const geteventsbytype = "/api/eventsCalendar/findbytype";
const geteventsbycategory = "/api/eventsCalendar/findeventbycategory";
const geteventsbytime = "/api/eventsCalendar/findeventsbytime";

// Function to fetch events from the backend
async function fetchEvents() {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const events = [];

    for (let i = 0; i < 5; i++) {
      // const currentYear = year + Math.floor((month + i - 1) / 12);
      // const currentMonth = (month + i) % 12 || 12;
      
      const monthOffset = month + i - 1;
      const currentYear = year + Math.floor(monthOffset / 12);
      const currentMonth = (monthOffset % 12) + 1;

      const response = await fetch(`${getevents}?year=${currentYear}&month=${currentMonth}`);
      const data = await response.json();
      events.push(...data);
    }

    console.log(events);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// // Function to fetch events by type from the backend
// async function fetchEventsByType(type) {
//   try {
//     const response = await fetch(`${geteventsbytype}?type=${type}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching events by type:', error);
//     return [];
//   }
// }


// // Function to fetch events by category from the backend
// async function fetchEventsByCategory(category) {
//   try {
//     const response = await fetch(`${geteventsbycategory}?category=${category}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching events by category:', error);
//     return [];
//   }
// }

// // Function to fetch events by time from the backend
// async function fetchEventsByTime(year, month, week, day) {
//   try {
//     const response = await fetch(`${geteventsbytime}?year=${year}&month=${month}&week=${week}&day=${day}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching events by time:', error);
//     return [];
//   }
// }

// async function fetchEvents() {
//   try {
//     const response = await fetch("dummy.json");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching dummy events:", error);
//     return [];
//   }
// }


// Function to format a date as "YYYY-MM-DD"
// function formatDate(date) {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }
function formatDate(dateString) {
  const [year, month, day] = dateString.split('T')[0].split('-');
  const date = new Date(year, month - 1, day);
  const options = { day: 'numeric', month: 'short' };
  return date.toLocaleDateString(undefined, options);
}
function fetchdate(datetime) {
  if (!datetime) {
    return null;
  }
  let date = datetime.split('T')[0]; // Extracts the date
  return date;
}

function fetchdate(datetime) {
  if (!datetime) {
    return null;
  }
  let date = datetime.split('T')[0]; // Extracts the date
  return date;
}

function fetchtime(startdatetime, enddatetime) {

// Parse time string to obtain hours and minutes

let [startn, startMillis] = startdatetime.split('T')[1].split('.')[0].split(':').map(Number);
// Add 5 hours and 30 minutes
startn += 5;
startMillis += 30;
// Handle overflow
if (startMillis >= 60) {
    startn += 1;
    startMillis -= 60;
}
// Convert to string
startn = `${startn.toString().padStart(2, '0')}:${startMillis.toString().padStart(2, '0')}`;

// Parse end time
let [endn, endMillis] = enddatetime.split('T')[1].split('.')[0].split(':').map(Number);

// Add 5 hours and 30 minutes
endn += 5;
endMillis += 30;

// Handle overflow
if (endMillis >= 60) {
    endn += 1;
    endMillis -= 60;
}
// Convert to string
endn = `${endn.toString().padStart(2, '0')}:${endMillis.toString().padStart(2, '0')}`;

 
 let start=startn;
 let end=endn;
  if (!start) {
    return null;
  }
  const [starthours, startminutes] = start.split(':');
  const [endhours, endminutes] = end.split(':');
  let formattedTime;
  const currentDateTime = new Date();
  const currentHours = currentDateTime.getHours();
  const currentMinutes = currentDateTime.getMinutes();
  const currentDate = currentDateTime.getDate();
  const currentMonth = currentDateTime.getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const startDateTime = new Date(startdatetime);
  const endDateTime = new Date(enddatetime);
  const startDay = startDateTime.getDate();
  const startMonth = startDateTime.getMonth();
  const startingMonth = monthNames[startDateTime.getMonth()];
  const endDay = endDateTime.getDate();
  const endMonth = endDateTime.getMonth();
  const endingMonth = monthNames[endDateTime.getMonth()];
  const isMultiDayEvent = startDay !== endDay || startMonth !== endMonth;

  // Convert start hours to 12-hour format
  let startPeriod = "AM";
  let startHours12 = parseInt(starthours);
  if (startHours12 >= 12) {
    startPeriod = "PM";
    if (startHours12 > 12) {
      startHours12 -= 12;
    }
  }

  // Convert end hours to 12-hour format
  let endPeriod = "AM";
  let endHours12 = parseInt(endhours);
  if (endHours12 >= 12) {
    endPeriod = "PM";
    if (endHours12 > 12) {
      endHours12 -= 12;
    }
  }

  if (currentDate === startDay && currentMonth === startMonth) {
    if (
      currentHours > parseInt(starthours) ||
      (currentHours === parseInt(starthours) && currentMinutes >= parseInt(startminutes))
    ) {
      if (
        currentHours < 12 || // For multi-day event, live till 12 PM
        (currentDate < endDay || (currentDate === endDay && currentMonth === endMonth))
      ) {
        // formattedTime = `<span class="text-red-600">⦿ LIVE </span> ${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod} <span class="bg-accent text-white px-1 py-[0.5] rounded text-nowrap whitespace-pre" style="white-space: pre;" > ${endDay} ${endingMonth} </span>`;
        formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod} 
      
        `;
      } else {
        formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod}
        `;
      }
    } else {
      formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod} `;
    }
  } else {
    formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod} `;
  }
  return formattedTime;
}


async function addEventsToHTML() {
  const events = await fetchEvents();

  const eventsByDate = {};
  const multiDayEvents = [];

  const filteredEvents = events.filter((event) => {
    const formattedStartDate = new Date(fetchdate(event.startDateTime));
    const formattedEndDate = new Date(fetchdate(event.endDateTime));
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date

    // Check if the event is a multi-day event
    if (formattedEndDate > formattedStartDate && event.show === true) {
      multiDayEvents.push(event);
    }

    return formattedStartDate.getFullYear() === currentDate.getFullYear() && formattedStartDate >= currentDate && event.show === true;
  });

// Existing code...
filteredEvents.forEach((event) => {
  const formattedStartDate = new Date(fetchdate(event.startDateTime));
  const formattedEndDate = new Date(fetchdate(event.endDateTime));
  const dateKey = formattedStartDate.toISOString().split("T")[0]; // Use ISO string as the key
  if (!eventsByDate[dateKey]) {
    eventsByDate[dateKey] = [];
  }
  eventsByDate[dateKey].push(event);
});

// New code...
const currentDate = new Date();
const currentDateKey = `${currentDate.getUTCFullYear()}-${String(currentDate.getUTCMonth() + 1).padStart(2, '0')}-${String(currentDate.getUTCDate()).padStart(2, '0')}`;

multiDayEvents.forEach((event) => {
 const formattedStartDate = new Date(fetchdate(event.startDateTime));
formattedStartDate.setHours(0, 0, 0, 0);

const formattedEndDate = new Date(fetchdate(event.endDateTime));
formattedEndDate.setHours(0, 0, 0, 0);

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// Check if the current date is within the range of the multi-day event
if (formattedStartDate <= currentDate && formattedEndDate >= currentDate) {
  if (!eventsByDate[currentDateKey]) {
    eventsByDate[currentDateKey] = [];
  }
  const isEventAlreadyAdded = eventsByDate[currentDateKey].some((e) => e._id === event._id);
  if (!isEventAlreadyAdded) {
    eventsByDate[currentDateKey].push(event);
  }
}
});
// Rest of your code...

  // Sort events in eventsByDate based on start time
  for (const dateKey in eventsByDate) {
    eventsByDate[dateKey].sort((a, b) => {
      const startTimeA = new Date(a.startDateTime).getTime();
      const startTimeB = new Date(b.startDateTime).getTime();
      return startTimeA - startTimeB;
    });
  }

  // Sort events by date
  const sortedEvents = Object.entries(eventsByDate).sort(([dateA], [dateB]) => {
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);
    return dateObjA - dateObjB;
  });

  // Create HTML elements for each event
  for (const [date, events] of sortedEvents) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString("default", { month: "short" });
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date

    let eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date

    let displayDate;
    if (
      currentDate.getDate() == eventDate.getDate() &&
      currentDate.getMonth() == eventDate.getMonth() &&
      currentDate.getFullYear() == eventDate.getFullYear()
    ) {
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString("default", { month: "short" });
      displayDate = `Today ${day} ${month} <span class="text-slate-500 font-normal text-base">${getDayOfWeek(
        new Date(currentDate)
      )}</span>`;
    } else {
      const day = eventDate.getDate();
      const month = eventDate.toLocaleString("default", { month: "short" });
      displayDate = `${day} ${month} <span class="text-slate-500 font-normal text-base">${getDayOfWeek(
        new Date(eventDate)
      )}</span>`;
    }

    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item ";

    const timelineContent = document.createElement("div");
    timelineContent.className = "timeline-content -ml-6 ";

    timelineContent.innerHTML = `
    <div class="h-4 w-4  rounded-full flex items-center justify-center " style="margin-left: -9.5px;background-color:#D47400;border:"2px solid #6a4210";"></div>      
        <div class="ml-6 ">
          <h3 class="text-lg font-semibold" style="margin-top: -25px; margin-bottom: 15px;">${displayDate}</h3>
          <div class="flex flex-col ">
          ${eventsByDate[date].map((events) => createEventCard(events)).join("")}
           </div>
        </div>
    `;

    timelineItem.appendChild(timelineContent);

    const timeline = document.querySelector(".timeline");
    timeline.appendChild(timelineItem);
  }
}


const camelToFlat=(camel)=>{
  const camelCase =camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")

  let flat =""

  camelCase.forEach(word=>{    
      flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  })  
  return flat;
}



function createEventCard(event) {

  return `
  <div class="card group mb-6 rounded-xl shadow-lg flex flex-col justify-between cursor-pointer hover:shadow-xl"
      onclick="openModal('${event._id}')">
      <div
          class="card-content bg-white border rounded-xl shadow-sm sm:flex border-slate-500/50 flex sm:flex-row flex-col-reverse justify-between hover:border-slate-900 ">
          <div class="Not-Poster p-4 flex flex-col justify-between"  style="width:100%;">
              <div>
                  <div class="flex sm:flex-row flex-col items-baseline" style="align-items:baseline;">
                      <div class="mr-3">
                          <p class="text-accent font-semibold mb-1 text-sm">
                              ${fetchtime(event.startDateTime, event.endDateTime)}
                          </p>
                      </div>
                      <span class="tag uppercase text-center text-me-2 px-2 py rounded-full opacity-90 font-semibold" style="background-color:${getTagbgColor(
                        event.category
                    )}; margin-top:2.2px; font-size:13px ; color:${getTagColor(
                        event.category
                    )}; border: 2px solid ${getTagColor(
                        event.category
                    )};">
${event.category}
</span>
  
                  </div>
                  <h3 class=" font-semibold text-slate-700 text-lg ">
                      ${event.eventName}
                  </h3>
                  <p class="mt-1 text-gray-400 dark:text-gray-700" style="font-size: 14;">
                      Organized by ${event.organisingDept}
                  </p>
              </div>
              <div class="mt-3 flex flex-col gap-1" >
                  <div class="flex flex-row mb-2 gap-1 items-center" >
                  <a href="https://xceed.nitj.ac.in/classrooms" target="_blank" rel="noopener noreferrer">
                      <svg class=" " xmlns="http://www.w3.org/2000/svg" height="17" viewBox="0 -960 960 960" width="17" style="vertical-align: middle;">
                        <style>
                          svg:hover path {
                            fill: blue;
                          }
                          
                        </style>
                        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                      </svg>
                      </a>
                      <span class="text-slate-700 hover:text-accent" style="venue vertical-align: middle; margin-bottom: 20; ">
                        <a href="https://xceed.nitj.ac.in/classrooms" target="_blank" rel="noopener noreferrer">
                          ${event.venue}
                        </a>
                      </span>
                  </div>
                  <div class=" items-center flex flex-wrap">
                      <div class="button-group flex-ror flex flex-wrap" style="gap: 15px;">
                          ${
                          event.meetlink
                          ? `<button type="button" data-te-ripple-init Button
                              class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                              style="border: 2px solid rgb(72, 139, 206);"
                              onclick="event.stopPropagation(); window.open('${event.meetlink}', '_blank');">
                              <span class="material-symbols-outlined">
                              video_camera_front
                              </span>
                              Join
                          </button>`
                          : ""
                          }
                          ${
                            event.pdfLink
                            ? `<button type="button" data-te-ripple-init Button
                                class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                                style="border: 2px solid rgb(72, 139, 206);"
                                onclick="event.stopPropagation(); window.open('${event.pdfLink}', '_blank');">
                                <span class="material-symbols-outlined">
                                    link
                                </span>
                                Link
                            </button>`
                            : ""
                            }
                            ${
                              event.regLink
                              ? `<button type="button" data-te-ripple-init Button
                                  class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-1.5   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                                  style="border: 2px solid rgb(72, 139, 206);"
                                  onclick="event.stopPropagation(); window.open('${event.regLink}', '_blank');">
                                  <span class="material-symbols-outlined">
                                  app_registration
                                  </span>
                                  Register
                              </button>`
                              : ""
                              }
                               
                          <div>
                          ${event.multiDayEvent ? `<span class="text-sm text-white px-1 py-1 rounded text-nowrap flex flex-wrap" style="background-color:#9CE2BD9B" > 
                          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" fill="#0E6939"/></svg>
                          <span class="font-semibold mr-2"style="color:#0E6939;">
                          
        Multi Day Event</span> <span class="px-1 font-medium" style="background-color:#37845C; border-radius:4px;"> ${formatDate(event.startDateTime)} - ${formatDate(event.endDateTime)} </span> </span>` : ''}
        </div>
  
                      </div>
                  </div>
              </div>
          </div>
          <div class="Poster relative overflow-hidden md:rounded-se-none p-2 justify-center items-center hidden md:block ">
              <img class="rounded-xl aspect-square object-center w-72"
                src="${event.posterUrl ? event.posterUrl : './assets/logo_nitj.webp'}" alt="Image Description">
          </div>
      </div>
  </div>
  
  <div id="modal-${
  event._id
  }" class="modal hidden fixed z-50 inset-0 w-full h-full overflow-auto" onclick="closeModal('${
  event._id
  }')" style="  background-color: #000000C8;">
      <style>
          .modal-content {
              animation: slideRight 0.4s ease-in-out;
          }
  
          @keyframes slideRight {
              0% {
                  transform: translateX(50%);
              }
  
              100% {
                  transform: translateX(0);
              }
          }
      </style>
      <div class="modal-content m-auto mt-60 p-5 ${window.innerWidth <= 640 ? 'w-full' : 'w-3/5'} h-full fixed sm:left-1/2 md:transform md:translate-x-1/2 md:translate-y-1/2 bg-white bg-opacity-65 backdrop-blur-md rounded-l-lg border border-opacity-40 overflow-scroll" 
      onclick="event.stopPropagation()">
          <!-- Close button -->
          <span
                class="close text-white bg-accent float-left text-lg font-bold w-5 h-5 items-center justify-center flex rounded-full border border-gray-700 hover:text-white focus:text-white focus:outline-none cursor-pointer" style="padding-bottom:2px; transform: scale(125%);"
              onclick="closeModal('${event._id}')">&times;</span>
  
          <!-- Modal content -->
          <div class="p-4 flex justify-center" style="min-width:47vw">
              <img class="object-scale-down" src="${event.posterUrl ? event.posterUrl : './assets/logo_nitj.webp'}" alt="Event Image" style="border-radius: 8px; height:300px;width:300px;">
          </div>
  
          <div class="flex flex-col gap-4 p-3 ">
              <div class="">
  
                  <b>
                      <h2 style="margin-bottom: 15px; font-size: larger; color:" #000000"; ">${
                    event.eventName
                  }</h2></b>
      
     <div class="flex flex-row  gap-3">
     <div>
                  <span class="tag uppercase text-center text-me-2 px-2 py-1 rounded-full opacity-90 font-semibold" style="background-color:${getTagbgColor(
                    event.category
                )}; margin-top:2.2px; font-size:13px ; color:${getTagColor(
                    event.category
                )}; border: 2px solid ${getTagColor(
                    event.category
                )};">
${event.category}
</span>
</div>
<div>
${event.multiDayEvent ? `<span class=" text-sm text-white px-1 py-1 rounded text-nowrap flex flex-wrap  " style="background-color:#9CE2BD9B" > 
<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" fill="#0E6939"/></svg>
<span class=" font-semibold mr-2"style="color:#0E6939;">

Multi Day Event</span> <span class=" px-1 font-medium" style="background-color:#37845C; border-radius:4px;"> ${formatDate(event.startDateTime)} - ${formatDate(event.endDateTime)} </span> </span>` : ''}
</div>
  </div>
          </div>
          <div style="font-size: medium; color: rgba(0, 0, 0, 0.681);">
              <div class="flex flex-row space-between justify-between items-baseline">
  
                  <h2 class="font-semibold text-lg" style=" color:#1E1E1E;">${
                      event.venue
                      }</h2>
                  <h3 class=" font-semibold text-accent-orange text-lg"> Organizer : ${
                      event.organisingDept
                      }</h3>
              </div>
  
              <br />
              <h3 class="text-accent font-semibold mb-1 " style="margin-top: -5px; font-size: 16; margin-bottom: 10px;">
                  ${fetchtime(event.startDateTime, event.endDateTime)}
              </h3>
              <p>${event.description}</p>
          </div>
          </div>
  
          <div style="margin-top: 20px;">
          <div class="info flex-row flex p-3" style="gap: 15px;">
          ${
            event.meetlink
            ? `<button type="button" data-te-ripple-init Button
                class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                style="border: 2px solid rgb(72, 139, 206);"
                onclick="event.stopPropagation(); window.open('${event.meetlink}', '_blank');">
                <span class="material-symbols-outlined">
                video_camera_front
                </span>
                Join
            </button>`
            : ""
            }
            ${
              event.pdfLink
              ? `<button type="button" data-te-ripple-init Button
                  class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                  style="border: 2px solid rgb(72, 139, 206);"
                  onclick="event.stopPropagation(); window.open('${event.pdfLink}', '_blank');">
                  <span class="material-symbols-outlined">
                      link
                  </span>
                  Link
              </button>`
              : ""
              }
              ${
                event.regLink
                ? `<button type="button" data-te-ripple-init Button
                    class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-white bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                    style="border: 2px solid rgb(72, 139, 206);"
                    onclick="event.stopPropagation(); window.open('${event.regLink}', '_blank');">
                    <span class="material-symbols-outlined">
                    app_registration
                    </span>
                    Register
                </button>`
                : ""
                }
          </div>
          <div class="flex flex-col p-3 gap-3">

          ${Object.entries(event)
            .map(([key, value]) => {
                const flatKey = camelToFlat(key);
                if (
                    ![
                        "_id",
                        "eventName",
                        "startDateTime",
                        "endDateTime",
                        "organisingDept",
                        "category",
                        "venue",
                        "type",
                        "meetlink",
                        "description",
                        "department",
                        "posterUrl",
                        "show",
                        "multiDayEvent",
                        "createdAt",
                        "updatedAt"
                    ].includes(key) &&
                    ((typeof value !== "boolean" && value && value.toString().trim() !== "" && !isEmptyObject(value)) ||
                    (typeof value === "boolean" && value))
                ) {
                  if (key === "createdAt" || key === "updatedAt") {
                    // Parse the value as a date, format it to a locale string
                    const date = new Date(value);
                    value = date.toLocaleDateString();
                  }
                    if (typeof value === "object") {
                        const subEntries = Object.entries(value)
                            .map(([subKey, subValue]) => {
                                const flatSubKey = camelToFlat(subKey);
                                if (subKey !== "_id" && subValue && subValue.toString().trim() !== "" && !isEmptyObject(subValue)) {
                                    if (typeof subValue === "object") {
                                        const subSubEntries = Object.entries(subValue)
                                            .map(([subSubKey, subSubValue]) => {
                                                const flatSubSubKey = camelToFlat(subSubKey);
                                                if (subSubKey !== "_id" && subSubValue && subSubValue.toString().trim() !== "" && !isEmptyObject(subSubValue)) {
                                                    if (typeof subSubValue === "string" && subSubValue.startsWith("http")) {
                                                        return `<div><p><span class="font-extrabold">${flatSubSubKey}</span>: <a href="${subSubValue}" target="_blank">${subSubValue}</a></p></div>`;
                                                    } else {
                                                        return `<div><p><span class="font-medium">${flatSubSubKey}:</span> ${subSubValue}</p></div>`;
                                                    }
                                                }
                                            })
                                            .filter(Boolean)
                                            .join("");
                                        if (subSubEntries) {
                                            return `<div class="flex flex-col gap-2"><p><b>${flatSubKey}</b></p><div class="flex flex-col gap-1" style="margin-left: 20px;">${subSubEntries}</div></div>`;
                                        }
                                    } else {
                                        if (typeof subValue === "string" && subValue.startsWith("http")) {
                                            return `<p><span class="font-medium">${flatSubKey}</span>: <a href="${subValue}" target="_blank">${subValue}</a></p>`;
                                        } else {
                                            return `<p><span class="font-medium">${flatSubKey}</span>: ${subValue}</p>`;
                                        }
                                    }
                                }
                            })
                            .filter(Boolean)
                            .join("");
                        if (subEntries) {
                            return `<div class="flex flex-col gap-2"><div class="bg-accent rounded-md p-1 pl-3"><p class="text-white"><b>${flatKey}</b></p></div><div class="flex flex-col gap-1" style="margin-left: 20px;">${subEntries}</div></div>`;
                        }
                    } else {
                        if (typeof value === "boolean") {
                            return `<p><b>${flatKey}</b>: ${value ? "✅" : "❌"}</p>`;
                        } else if (typeof value === "string" && value.startsWith("http")) {
                            return `<p><b>${flatKey}</b>: <a href="${value}" target="_blank">${value}</a></p>`;
                        } else {
                            return `<p><b>${flatKey}</b>: ${value}</p>`;
                        }
                    }
                }
            })
            .filter(Boolean)
            .join("")}
        
        
          </div>
          </div>
      </div>
  </div>
  </>`;
}

function isEmptyObject(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!isEmptyObject(obj[key])) {
          return false;
        }
      } else if (obj[key] !== null && obj[key] !== undefined && obj[key].toString().trim() !== "") {
        return false;
      }
    }
  }
  return true;
}
function openModal(eventId) {
  const modal = document.getElementById(`modal-${eventId}`);
  modal.style.display = "block";
}

function closeModal(eventId) {
  const modal = document.getElementById(`modal-${eventId}`);
  modal.style.display = "none";
}

function openDialog(name, time, organizer, venue, posterUrl) {
  // You can implement your dialog box logic here
  alert(
    `Event Details:\nName: ${name}\nTime: ${time}\nOrganizer: ${organizer}\nVenue: ${venue}`
  );
}

function getDayOfWeek(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

// function getTagColor(tagName) {
//   switch (tagName) {
//     case "academic":
//       return 'border-purple-500 bg-purple-100 text-purple-500' //
//     case "placement":
//       return 'border-red-500 bg-red-100 text-red-500' //    
//     case "club":
//       return 'border-emerald-500 bg-emerald-100 text-emerald-500' 
//     case "sports":
//       return 'border-green-500 bg-green-100 text-green-500' // 
//     case "holiday":
//       return 'border-orange-500 bg-orange-100 text-orange-500'//
//     case "fest":
//       return 'border-green-500 bg-green-100 text-green-500' 
//     case "STC/FDP":
//       return 'border-yellow-500 bg-yellow-100 text-yellow-500'
//     case "conference":
//       return 'border-yellow-500 bg-yellow-100 text-yellow-500' 
//     default:
//       return "#FF00FF"; // Magenta
//   }
// }



function getTagColor(tagName) {
  switch (tagName) {
    case "academic":
      return "#C46902"; // Orange
    case "placement":
      return "#4F46E5"; // Yellow
    case "club":
      return "#C026D3"; // Pink
    case "sports":
      return "#047A47"; // Green
    case "holiday":
      return "#DC2626"; // Purple
    case "Guest Lecture":
      return "#DC2626"; // Purple  
    case "fest":
      return "#BE185D"; // Deep Pink
    case "STC/FDP":
      return "#5EA304"; // Orange
    case "conference":
      return "#6F6F07"; // Cyan
    default:
      return "#FF00FF"; // Magenta
  }
}

function getTagbgColor(tagName) {
  switch (tagName) {
    case "academic":
      return "#FFA94854"; // Orange
    case "placement":
      return "#635BFF4F"; // Yellow
    case "club":
      return "#DC3FF153"; // Pink
    case "sports":
      return "#29BE7E53"; // Green
    case "holiday":
      return "#FF5A5A57"; // Purple
    case "Guest Lecture":
      return "#FF5A5A57"; // Purple  
    case "fest":
      return "#EF498E59"; // Deep Pink
    case "STC/FDP":
      return "#9CE04352"; // Orange
    case "conference":
      return "#FFE065C7"; // Cyan
    default:
      return "#FF00FF57"; // Magenta
  }
}

window.onload = addEventsToHTML;

