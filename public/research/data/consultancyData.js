var years;
let data_url = "/api";

async function helper() {
  const res = await fetch(
    `${data_url}` + `/research/consultancies/groupByYear`
  );

  const data = await res.json();
  years = Object.keys(data);
  years.sort();
  years.reverse();
  const ugupdates = document.getElementById("sidetab");
  var i = 1;
  years.forEach((update) => {
    const ugupdate = document.createElement("ul");
    if (i == 1) {
      ugupdate.innerHTML = `
    <li class="active2 bg-accent mb-1 rounded-md  text-white  hover:text-black">
    <span class="text" >Financial Year (${Number(update)}-${Number(update) + 1
        })  </span>
    </li>
      `;
    } else {
      ugupdate.innerHTML = `
        <li class=" bg-accent mb-1 rounded-md  text-white  hover:text-black">
        <span class="text">Financial Year (${update}-${Number(update) + 1
        })  </span>
        </li>
          `;
    }
    ugupdates.appendChild(ugupdate);
    i++;
  });

  helper2();
}

async function helperSmallScreen() {
  const res = await fetch(
    `${data_url}` + `/research/consultancies/groupByYear`
  );
  const data = await res.json();
  years = Object.keys(data);
  years.sort();
  years.reverse();
  const ugupdates = document.getElementById("smallScreenSidetab");
  var i = 1;
  years.forEach((update) => {
    const ugupdate = document.createElement("ul");
    if (i == 1) {
      ugupdate.innerHTML = `
      <li x-on:click="dropdownMenu = ! dropdownMenu" onclick=dropDownContentOnClick(${update})
      class="active2 bg-accent mb-1 rounded-md  text-white  hover:text-black">
      <span class="text dropContent1" >Financial Year (${update}-${Number(update) + 1
        })  </span>
    </li>
      `;
    } else {
      ugupdate.innerHTML = `
      <li x-on:click="dropdownMenu = ! dropdownMenu" onclick=dropDownContentOnClick(${update})
      class=" bg-accent mb-1 rounded-md  text-white  hover:text-black">
      <span class="text dropContent1" >Financial Year (${update}-${Number(update) + 1
        })  </span>
    </li>
          `;
    }
    ugupdates.appendChild(ugupdate);
    i++;
  });
}



function dropDownContentOnClick(year) {
  let dis = document.getElementById("currentDisplay");
  dis.style.display = "block"
  let head = document.getElementById("displayYear");
  head.innerHTML = `Financial Year (${year}-${Number(year) + 1})`
}



async function helper2() {
  const content = document.getElementById("content");
  const head = document.createElement("div");
  head.classList.add(
    "rounded-lg",
    "shadow-sm",
    "w-[100%]",

  );

  content.appendChild(head);
  // console.log(years.length);
  for (var i = 0; i < years.length; i++) {
    const tableContent = document.createElement("div");
    console.log("hello");
    console.log(i);
    if (i == 0) {
      const res = await fetch(
        `${data_url}/research/consultancies/year?startYear=${years[i]}`
      );
      const data = await res.json();
      const element = document.createElement("div");
      element.classList.add(
        "rounded-lg",
        "shadow-sm",
        "w-[100%]",
      );
      // tableContent.appendChild(element)

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      thead.innerHTML = `
      <tr>
      <th class="border bg-color-1 text-white px-8 py-2 w-[8%]">S. No.</th>
                  <th class="border bg-color-1 text-white px-8 py-2  w-[13%]">Name of Faculty (Chief Consultant)</th>
                  <th class="border bg-color-1 text-white px-8 py-2     w-[13%]">Year</th>
                  <th class="border bg-color-1 text-white px-8 py-2 w-[25%]">Client Organization</th>
                  <th class="border bg-color-1 text-white px-8 py-2 w-[25%]">Title of Consultancy of Project</th>
                  <th class="border bg-color-1 text-white px-8 py-2     w-[13%]">Amount Received (in Rupees)</th>
    </tr>
      `
      table.append(thead);
      table.classList.add("tab_wrap", "w-[100%]");
      const tbody = document.createElement("tbody");
      tbody.classList.add("text-left");
      table.appendChild(tbody);
      var j = 1;
      data.forEach((update) => {
        const ugupdate = document.createElement("tr");
        ugupdate.innerHTML = `
        <td class="border px-8 py-2 text-sm whitespace-nowrap"> ${j}</td>
            <td class="border px-8 py-2 text-sm   ">${update.facultyName}</td>
            <td class="border px-8 py-2 text-sm   ">${years[i]}</td>
            <td class="border px-8 py-2 text-sm   ">${update.clientOrg}</td>
            <td class="border px-8 py-2 text-sm   ">${update.title}</td>
             <td class="border px-8 py-2 text-sm   ">${update.amountDigits}</td>
          `;
        tbody.appendChild(ugupdate);
        j++;
      });
      element.appendChild(table)
      content.appendChild(element);
    }
    else {
      const res = await fetch(
        `${data_url}/research/consultancies/year?startYear=${years[i]}`
      );
      const data = await res.json();
      const element = document.createElement("div");
      element.classList.add(
        "rounded-lg",
        "shadow-sm",
        "w-[100%]",

      );

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      thead.innerHTML = `
      <tr>
      <th class="border bg-color-1 text-white px-8 py-2 w-[8%]">S. No.</th>
                  <th class="border bg-color-1 text-white px-8 py-2  w-[13%]">Name of Faculty (Chief Consultant)</th>
                  <th class="border bg-color-1 text-white px-8 py-2     w-[13%]">Year</th>
                  <th class="border bg-color-1 text-white px-8 py-2 w-[25%]">Client Organization</th>
                  <th class="border bg-color-1 text-white px-8 py-2 w-[25%]">Title of Consultancy of Project</th>
                  <th class="border bg-color-1 text-white px-8 py-2     w-[13%]">Amount Received (in Rupees)</th>
    </tr>
      `
      table.append(thead);
      table.classList.add("tab_wrap", "w-[100%]", "hidden");
      const tbody = document.createElement("tbody");
      tbody.classList.add("text-left");
      table.appendChild(tbody);
      var j = 1;
      data.forEach((update) => {
        const ugupdate = document.createElement("tr");
        ugupdate.innerHTML = `
        <td class="border px-8 py-2 text-sm whitespace-nowrap">${j}</td>
            <td class="border px-8 py-2 text-sm   ">${update.facultyName}</td>
            <td class="border px-8 py-2 text-sm   ">${years[i]}</td>
            <td class="border px-8 py-2 text-sm   ">${update.clientOrg}</td>
            <td class="border px-8 py-2 text-sm   ">${update.title}</td>
             <td class="border px-8 py-2 text-sm   ">${update.amountDigits}</td>
          `;
        tbody.appendChild(ugupdate);
        j++;
      });
      element.appendChild(table)
      content.appendChild(element);
    }
  }

  helper3();
}

function helper3() {
  var tabs = document.querySelectorAll(".tabs ul li");
  var tab_wraps = document.querySelectorAll(".tab_wrap");
  var tab_wraps2 = document.querySelectorAll(".tracking-wider");
  var tabs2 = document.querySelectorAll(".tabs2 ul li");
  console.log(tabs);
  console.log(tab_wraps);
  tabs.forEach(function (tab, tab_index) {
    tab.addEventListener("click", function () {
      console.log(tab_index);
      tabs.forEach(function (tab) {
        tab.classList.remove("active2");
      });
      tab.classList.add("active2");
      console.log(tab_wraps);
      tab_wraps.forEach(function (content, content_index) {
        console.log(tab_index);
        console.log(content_index);
        if (content_index == tab_index) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });

      tab_wraps2.forEach(function (content2, content_index2) {
        if (content_index2 == tab_index) {
          content2.style.display = "block";
        } else {
          content2.style.display = "none";
        }
      });
    });
  });

  tabs2.forEach(function (tab, tab_index) {
    tab.addEventListener("click", function () {
      tabs2.forEach(function (tab) {
        tab.classList.remove("active2");
      });
      tab.classList.add("active2");

      tab_wraps.forEach(function (content, content_index) {
        if (content_index == tab_index) {
          content.style.display = "block";
        } else {
          content.style.display = "none";
        }
      });

      tab_wraps2.forEach(function (content2, content_index2) {
        if (content_index2 == tab_index) {
          content2.style.display = "block";
        } else {
          content2.style.display = "none";
        }
      });
    });
  });
}

helper();
helperSmallScreen();
