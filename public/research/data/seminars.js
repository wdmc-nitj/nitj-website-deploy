let data_url = "/api";
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

function funcTime(d){
  const h=d.getHours()%12;
  const m=d.getMinutes();
  const hour= h.toString().length==1?"0"+h.toString():h.toString();

  return hour+":"+m.toString()+(d.getHours()>12?"PM":"AM");
}

fetch(`${data_url}` + '/research/events/get?visible=visible&upcoming=true&category=seminar')
  .then((response) => response.json())
  .then((data) => {

    const ugupdates = document.getElementById('upcoming_seminars')
    data.forEach((update) => {
      const ugupdate = document.createElement('div')
      var d = new Date(update.startDate);

      ugupdate.innerHTML = `
    <div class="lg:flex shadow rounded-lg border w-[100%] mb-4 border-gray-400">
    <div class="bg-accent rounded-lg lg:w-[30%] w-[30%] py-4 block h-full shadow-inner mx-auto">
      <div class="text-center tracking-wide">
        <!--date-->
        <div class="text-white font-bold text-4xl ">${d.getDate()}</div>
                  <div class="text-white font-normal text-2xl">${month[d.getMonth()].substring(0, 3)}</div>
     
      </div>
    </div>
    <div class="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
      <div class="flex flex-row lg:justify-start justify-center">
        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
          <!--time-->
<<<<<<< Updated upstream
          ${d.getHours()<=5 ?  `` : ` <i class="far fa-clock"></i> ${d.getHours()}:${d.getMinutes().toString().length == 1 ? 0 + d.getMinutes().toString() : d.getMinutes()}${d.getHours() < 12 ? "AM" : "PM"}`}
         
=======
          <i class="far fa-clock"></i> ${d.getHours()==5?" ":funcTime(d)}
        </div>
        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
        Organiser : ${update.organiser===undefined?" ":update.organiser}
>>>>>>> Stashed changes
        </div>
        ${update.organiser ?` <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
        Organiser : ${update.organiser}
      </div>` : ``}
       
      </div>
      <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
        ${update.title}
      </div>

<<<<<<< Updated upstream
      ${update.venue ? `  <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
      <!--address / location-->
      ${update.venue}
    </div>`: `` }
    
=======
      <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
        <!--address / location-->
        ${update.venue===undefined?" ":update.venue}
      </div>
>>>>>>> Stashed changes
    </div>

  </div>
  
      `
      ugupdates.appendChild(ugupdate)
    })
  })


fetch(`${data_url}` + '/research/events/get?visible=visible&upcoming=false&category=seminar')
  .then((response) => response.json())
  .then((data) => {

    const ugupdates = document.getElementById('organizedSeminars')
    data.forEach((update) => {
      const ugupdate = document.createElement('div')
      var d = new Date(update.startDate);

      ugupdate.innerHTML = `
    <div class="lg:flex shadow rounded-lg border w-[100%] mb-4 border-gray-400">
    <div class="bg-accent rounded-lg lg:w-[30%] w-[30%] py-4 block h-full shadow-inner mx-auto">
      <div class="text-center tracking-wide">
        <!--date-->
        <div class="text-white font-bold text-4xl ">${d.getDate()}</div>
                  <div class="text-white font-normal text-2xl">${month[d.getMonth()].substring(0, 3)}</div>
     
      </div>
    </div>
    <div class="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
      <div class="flex flex-row lg:justify-start justify-center">
        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
          <!--time-->
<<<<<<< Updated upstream
          ${d.getHours()<=5 ?  `` : ` <i class="far fa-clock"></i> ${d.getHours()}:${d.getMinutes().toString().length == 1 ? 0 + d.getMinutes().toString() : d.getMinutes()}${d.getHours() < 12 ? "AM" : "PM"}`}
         
=======
          <i class="far fa-clock"></i> ${d.getHours()==5?" ":funcTime(d)}
          </div>
        <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
        Organiser : ${update.organiser===undefined?" ":update.organiser}
>>>>>>> Stashed changes
        </div>
        ${update.organiser ?` <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
        Organiser : ${update.organiser}
      </div>` : ``}
       
      </div>
      <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
        ${update.title}
      </div>

<<<<<<< Updated upstream
      ${update.venue ? `  <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
      <!--address / location-->
      ${update.venue}
    </div>`: `` }
    
=======
      <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
        <!--address / location-->
        ${update.venue===undefined?" ":update.venue}
      </div>
>>>>>>> Stashed changes
    </div>

  </div>
  
      `
      ugupdates.appendChild(ugupdate)
    })
  })
