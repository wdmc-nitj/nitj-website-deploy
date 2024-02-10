const getevents = `/api/eventsCalendar/events`;
const geteventsbytype = "/api/eventsCalendar/findbytype";
const geteventsbycategory = "/api/eventsCalendar/findeventbycategory";
const geteventsbytime = "/api/eventsCalendar/findeventsbytime";

// Function to fetch events from the backend
async function fetchEvents() {
  try {
    const response = await fetch(getevents);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Function to fetch events by type from the backend
async function fetchEventsByType(type) {
  try {
    const response = await fetch(`${geteventsbytype}?type=${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events by type:', error);
    return [];
  }
}


// Function to fetch events by category from the backend
async function fetchEventsByCategory(category) {
  try {
    const response = await fetch(`${geteventsbycategory}?category=${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events by category:', error);
    return [];
  }
}

// Function to fetch events by time from the backend
async function fetchEventsByTime(year, month, week, day) {
  try {
    const response = await fetch(`${geteventsbytime}?year=${year}&month=${month}&week=${week}&day=${day}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events by time:', error);
    return [];
  }
}

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

function fetchdate(datetime) {
  if (!datetime) {
    return null;
  }
  let date = datetime.split('T')[0]; // Extracts the date
  return date;
}

function fetchtime(startdatetime, enddatetime) {
  let start = startdatetime.split('T')[1]; // Extracts the time
  let end = enddatetime.split('T')[1]; // Extracts the time
  if (!start) {
    return null;
  }
  const [starthours, startminutes] = start.split(':');
  const [endhours, endminutes] = end.split(':');
  let formattedTime;
  const currentDateTime = new Date();
  const currentHours = currentDateTime.getHours();
  const currentMinutes = currentDateTime.getMinutes();
  let startPeriod = "AM";
  let endPeriod = "AM";
  
  // Convert start hours to 12-hour format
  let startHours12 = parseInt(starthours);
  if (startHours12 >= 12) {
    startPeriod = "PM";
    if (startHours12 > 12) {
      startHours12 -= 12;
    }
  }
  
  // Convert end hours to 12-hour format
  let endHours12 = parseInt(endhours);
  if (endHours12 >= 12) {
    endPeriod = "PM";
    if (endHours12 > 12) {
      endHours12 -= 12;
    }
  }
  
  if (
    currentHours > parseInt(starthours) ||
    (currentHours === parseInt(starthours) && currentMinutes >= parseInt(startminutes))
  ) {
    if (
      currentHours < parseInt(endhours) ||
      (currentHours === parseInt(endhours) && currentMinutes < parseInt(endminutes))
    ) {
      formattedTime = `⦿ LIVE ${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod}`;
    } else {
      formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod}`;
    }
  } else {
    formattedTime = `${startHours12}:${startminutes} ${startPeriod} - ${endHours12}:${endminutes} ${endPeriod}`;
  }
  return formattedTime;
}

async function addEventsToHTML() {
  const events = await fetchEvents();

  const eventsByDate = {};


  const filteredEvents = []; // Array to store filtered events


  events.forEach((event)=>{
    const formattedDate = new Date(fetchdate(event.startDateTime));
    const currentDate = new Date();

    
    console.log(formattedDate.getFullYear() == currentDate.getFullYear());
    console.log(formattedDate.getFullYear());
    currentDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date
    if ((formattedDate.getFullYear() == currentDate.getFullYear()) &&( formattedDate >= currentDate)) {
      filteredEvents.push(event);
    }
  })

  filteredEvents.forEach((event) => {
    const formattedDate = new Date(fetchdate(event.startDateTime));
    if (!eventsByDate[formattedDate]) {
      eventsByDate[formattedDate] = [];
    }
    eventsByDate[formattedDate].push(event);

    });

  console.log(filteredEvents);

  // Create HTML elements for each event
  for (const date in eventsByDate) {
    const formattedDate = new Date(fetchdate(events.startDateTime));
    const day = formattedDate.getDate();
    const month = formattedDate.toLocaleString("default", { month: "short" });
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date

    let eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0); // to ignore time and compare only the date


    let displayDate;
    if (currentDate.getDate() == eventDate.getDate() && currentDate.getMonth() == eventDate.getMonth() && currentDate.getFullYear() == eventDate.getFullYear()){
      displayDate = "Today";
    } else {
      const day = eventDate.getDate();
      const month = eventDate.toLocaleString("default", { month: "short" });
      displayDate = `${day} ${month}`;
    }

    const timelineItem = document.createElement("div");
    timelineItem.className = "timeline-item ";

    const timelineContent = document.createElement("div");
    timelineContent.className = "timeline-content -ml-6 ";

    timelineContent.innerHTML = `
    <div class="h-4 w-4  rounded-full flex items-center justify-center " style="margin-left: -9.5px;  background-color: #D47400;border:"2px solid #6a4210"; "></div>      <div class="ml-6 " >
        <h3 class="text-lg font-semibold" style="margin-top: -25px; margin-bottom: 15px;">${displayDate} <span class="text-slate-500 font-normal text-base"> ${getDayOfWeek(new Date(fetchdate(events.startDateTime)))}</span></h3>
        <div class="flex flex-col ">
          ${eventsByDate[date].map((event) => createEventCard(event)).join("")}
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
  <div class=" card group mb-6 border border-dashed rounded-lg flex flex-col justify-between cursor-pointer hover:shadow-xl hover:border-slate-900 hover:border-4 transition dark:bg-slate-900 dark:shadow-slate-700/[.7]"
    onclick="openModal('${event._id}')">
    <div
        class="bg-white border rounded-xl shadow-sm sm:flex dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] flex flex-row justify-between hover:border-slate-900 hover:border-4">
        <div class="p-4 flex flex-col justify-between">
            <div>
                <div class="flex flex-row gap-3 " style="align-items: baseline;">
                    <div>
                        <p class="text-red-400 font-semibold mb-1"
                            style="margin-top: -5px; font-size: 16; margin-bottom: 10px;">
                            ${fetchtime(event.startDateTime, event.endDateTime)}
                        </p>
                    </div>
                    <div>
                        <span
                            class="tag uppercase text-center text-lg me-2 px-3 py-1 rounded-full opacity-90 font-semibold "
                            style="background-color:${getTagColor(
                              event.category
                            )}; margin-top:2.2px; font-size:13px ;   color: #FFFFFFB0;">${
    event.category
  }</span>
                    </div>
                </div>
                <h3 class=" font-semibold text-slate-700 text-lg">
                    ${event.eventName}
                </h3>
                <p class="mt-1 text-gray-400 dark:text-gray-700" style="font-size: 14;">
                    Organized by ${event.organisingDept}
                </p>
            </div>
            <div class="mt-3 flex flex-col gap-1">
                <div class="flex flex-row mb-2 gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style="vertical-align: middle;">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                            fill="#E58818" />
                    </svg>
                    <span style="vertical-align: middle; margin-bottom: 20; color:#4E4E4E;">${
                      event.venue
                    }</span>
                </div>
                <div>
                    <div class="button-group flex-ror flex" style="gap: 15px;">
                        ${
                          event.meetlink
                            ? `<button type="button" data-te-ripple-init Button
                            class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-accent bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                            style="border: 2px solid rgb(72, 139, 206);" onclick="event.stopPropagation(); window.open('${event.meetlink}', '_blank');">
                            <span class="material-symbols-outlined">
                                link
                            </span>
                            Link
                        </button>`
                            : ""
                        }
                        ${
                          event.download
                            ? `<button type="button" data-te-ripple-init Button
                            class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-accent bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                            style="border: 2px solid rgb(72, 139, 206);" onclick="event.stopPropagation(); window.open('${event.download}', '_blank');">
                            <span class="material-symbols-outlined">
                                download
                            </span>
                            Download
                        </button>`
                            : ""
                        }

                    </div>
                </div>
            </div>
        </div>
        <div class="relative overflow-hidden md:rounded-se-none p-2 ">
            <img class="object-cover rounded-xl w-48 h-48 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                src="${event.posterUrl}" alt="Image Description">
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
    <div class="modal-content m-auto mt-60 p-5 sm:w-3/5 w-full  h-full fixed  left-1/2 transform translate-x-1/2 translate-y-1/2 bg-white bg-opacity-65 backdrop-blur-md rounded-l-lg border border-opacity-40 overflow-scroll" 
        onclick="event.stopPropagation()">
        <!-- Close button -->
        <span
            class="close text-gray-500 float-left text-lg scale-200 font-bold w-5 h-5 pb-1 items-center justify-center flex rounded-full border border-gray-700 hover:text-black focus:text-white focus:outline-none cursor-pointer"
            onclick="closeModal('${event._id}')">&times;</span>

        <!-- Modal content -->
        <div class="p-4 flex justify-center" style="min-width:47vw">
            <img class="object-cover" src="${
              event.posterUrl
            }" alt="Event Image" style="border-radius: 8px; height:300px;width:300px;">
        </div>

        <div class="flex flex-col gap-4 p-3 ">
            <div class="">

                <b>
                    <h2 style="margin-bottom: 15px; font-size: larger; color:" #000000"; ">${
                      event.eventName
                    }</h2></b>
        
       
        <span class=" tag uppercase text-center text-lg me-2 px-3 py-1 rounded-full opacity-90 font-semibold"
                        style="background-color:${getTagColor(
                          event.category
                        )}; margin-top:2.2px; font-size:13px ;   color: #FFFFFFB0;">
                        ${event.category}</span>

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
                <h3 class="text-red-400 font-semibold mb-1 "
                    style="margin-top: -5px; font-size: 16; margin-bottom: 10px;">
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
                    class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-accent bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                    style="border: 2px solid rgb(72, 139, 206);" onclick="event.stopPropagation(); window.open('${event.meetlink}', '_blank');">
                    <span class="material-symbols-outlined">
                        link
                    </span>
                    Link
                </button>`
                    : ""
                }
                ${
                  event.download
                    ? `<button type="button" data-te-ripple-init Button
                    class="group flex flex-row gap-1 text-accent text-sm font-semibold bg-accent bg-opacity-50 hover:bg-accent hover:text-white hover:text-opacity-70 focus:outline-none focus:ring-4 focus:ring-offset-blue-950 rounded-lg text-center items-center justify-center align-middle px-2   text-nowrap transform transition duration-300 hover:scale-105 shadow-md py-0"
                    style="border: 2px solid rgb(72, 139, 206);" onclick="event.stopPropagation(); window.open('${event.download}', '_blank');">
                    <span class="material-symbols-outlined">
                        download
                    </span>
                    Download
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
                        "show"
                      ].includes(key) &&
                      value
                    ) {
                      if (typeof value === "object") {
                        return `
                          <div class="flex flex-col gap-2">
                            <div class="bg-accent rounded-md p-1 pl-3">
                            <p class=" text-white "><b>${flatKey}</b></p>
                            </div>
                            <div class="flex flex-col gap-1" style="margin-left: 20px;">
                              ${Object.entries(value)
                                .map(([subKey, subValue]) => {
                                  const flatSubKey = camelToFlat(subKey);
                                  if (!subKey.includes("_id")) {
                                    if (typeof subValue === "object") {
                                      return `
                                        <p><b>${flatSubKey}</b></p>
                                        <div >
                                          ${Object.entries(subValue)
                                            .map(([subSubKey, subSubValue]) => {
                                              const flatSubSubKey =
                                                camelToFlat(subSubKey);
                                              if (!subSubKey.includes("_id")) {
                                                if (
                                                  typeof subSubValue ===
                                                    "string" &&
                                                  subSubValue.startsWith("http")
                                                ) {
                                                  return `
                                                    <div>
                                                      <p><b>${flatSubSubKey}</b>: <a href="${subSubValue}" target="_blank">${subSubValue}</a></p>
                                                    </div>
                                                  `;
                                                } else {
                                                  return `
                                                    <div>
                                                      <p>${flatSubSubKey}: ${subSubValue}</p>
                                                    </div>
                                                  `;
                                                }
                                              }
                                            })
                                            .join("")}
                                        </div>
                                      `;
                                    } else {
                                      if (
                                        typeof subValue === "string" &&
                                        subValue.startsWith("http")
                                      ) {
                                        return `<p>${flatSubKey}: <a href="${subValue}" target="_blank">${subValue}</a></p>`;
                                      } else {
                                        return `<p>${flatSubKey}: ${subValue}</p>`;
                                      }
                                    }
                                  }
                                })
                                .join("")}
                            </div>
                          </div>
                        `;
                      } else {
                        if (
                          typeof value === "string" &&
                          value.startsWith("http")
                        ) {
                          return `<p>${flatKey}: <a href="${value}" target="_blank">${value}</a></p>`;
                        } else {
                          return `<p><b>${flatKey}</b> : ${value}</p>`;
                        }
                      }
                    }
                  })
                  .join("")}
                      
                </div>
        </div>
    </div>
</div>
</div>
    `;
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

function getTagColor(tagName) {
  switch (tagName) {
    case "academic":
      return "#0284C7";
    case "placements":
      return "#9333EA";
    case "club":
      return "#E11D48";
    case "sports":
      return "#059669";
    default:
      return "#B43909";
  }
}

window.onload = addEventsToHTML;

