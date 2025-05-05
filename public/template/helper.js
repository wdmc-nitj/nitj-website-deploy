
let leastpri = 5;


function executor() {
  if (priority < leastpri) {
    leastpri = priority;
  } else {
    leastpri++;
    return;
  }
  switch (leastpri) {
    case 1:
      close_menu();
      break;
    case 2:
      keep_menu_open();
      break;
    case 3:
      close_menu();
      break;
    case 4:
      close_menu();
      break;
  }
  leastpri++;
}
function open_menu() {
  let sideMenu = document.querySelector("#nav-menu");
  if (sideMenu.style.display == "none") {
    sideMenu.setAttribute("style", "display:block;");
    leastpri = 5;
  }
}
function keep_menu_open() {
  let sideMenu = document.querySelector("#nav-menu");
  if (sideMenu.style.display == "block") {
    sideMenu.setAttribute("style", "display:block;");
  }
  if (onmenu) {
    closeDropDowns();
    openDropDowns(9);
  }
  onmenu = true;
}
function close_menu() {
  let sideMenu = document.querySelector("#nav-menu");
  if (sideMenu.style.display == "block") {
    sideMenu.setAttribute("style", "display:none;");
  }
}


let dropdownmenus = document.getElementsByClassName("DropDowns");
let subdropdownmenus = document.getElementsByClassName("subDropDowns");
let dropdownmenubuttons = document.getElementsByClassName("dropdown-buttons");
let subdropdownmenubuttons = document.getElementsByClassName("subDropButtons");
let droparrows = document.getElementsByClassName("DropArrows");


function openDropDowns(id) {
  for (var i = 0; i < dropdownmenubuttons.length; i++) {
    if (
      dropdownmenubuttons[i].id[dropdownmenubuttons[i].id.length - 1] !=
      id[id.length - 1]
    ) {
      if (dropdownmenubuttons[i].classList.contains("hidden")) {
        dropdownmenubuttons[i].classList.remove("hidden");
      } else {
        dropdownmenubuttons[i].classList.add("hidden");
      }
    } else {
      if (dropdownmenubuttons[i].children[0].classList.contains("rotate-180")) {
        dropdownmenubuttons[i].children[0].classList.remove("rotate-180");
      } else {
        dropdownmenubuttons[i].children[0].classList.add("rotate-180");
      }
      dropdownmenubuttons[i].classList.remove("hidden");
    }
  }
  for (var i = 0; i < dropdownmenus.length; i++) {
    if (
      id[id.length - 1] == dropdownmenus[i].id[dropdownmenus[i].id.length - 1]
    ) {
      if (dropdownmenus[i].classList.contains("hidden")) {
        dropdownmenus[i].classList.remove("hidden");
      } else {
        dropdownmenus[i].classList.add("hidden");
      }
    } else {
      dropdownmenus[i].classList.add("hidden");
    }
  }
}
function closeDropDowns() {
  for (var i = 0; i < dropdownmenus.length; i++) {
    dropdownmenubuttons[i].classList.add("hidden");
    dropdownmenubuttons[i].children[0].classList.remove("rotate-180");
    subdropdownmenus[i].classList.add("hidden");
    subdropdownmenubuttons[i].children[0].classList.remove("rotate-180");
    dropdownmenus[i].classList.add("hidden");
  }
}

function openSubDropDowns(id) {
  for (var i = 0; i < subdropdownmenubuttons.length; i++) {
    if (
      id[id.length - 1] ==
        subdropdownmenus[i].id[subdropdownmenus[i].id.length - 1] &&
      id[id.length - 2] ==
        subdropdownmenus[i].id[subdropdownmenus[i].id.length - 2]
    ) {
      if (
        subdropdownmenubuttons[i].children[0].classList.contains("rotate-180")
      ) {
        subdropdownmenubuttons[i].children[0].classList.remove("rotate-180");
      } else {
        subdropdownmenubuttons[i].children[0].classList.add("rotate-180");
      }
      if (subdropdownmenus[i].classList.contains("hidden")) {
        subdropdownmenus[i].classList.remove("hidden");
      } else {
        subdropdownmenus[i].classList.add("hidden");
      }
    } else {
      subdropdownmenus[i].classList.add("hidden");
    }
  }
}

function checkEnter(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    search_resources();
  }
}

function showSearchPage(event) {
  // console.log(event.id)
  // if (event.id == 'search_form') {
  //   return
  // }
  var search_page = document.getElementById("search_page");
  if (search_page.classList.contains("hidden")) {
    document.body.classList.add("overflow-hidden");
    search_page.classList.add("overflow-scroll");
    search_page.classList.remove("hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    search_page.classList.add("overflow-scroll");
    search_page.classList.add("hidden");
  }
}

function display_resources() {
  let input = document.getElementById("searchbar");
  if(input.reportValidity()){
    let resources = document.getElementById("resources");
    if (resources.classList.contains("hidden")) {
      resources.classList.remove("hidden");
    } 
    // else {
    //   resources.classList.add("hidden");
    // }
  }
  else{
    let resources = document.getElementById("resources");
    if (!resources.classList.contains("hidden")) {
      resources.classList.add("hidden");
    }
  }
}

async function displayWords(words, links) {
  let sortedWords = words.sort();
  let groupedWords = sortedWords.reduce((acc, word) => {
    let firstLetter = word[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(word);
    return acc;
  }, {});
  for (let letter in groupedWords) {
    let Big_alphabets_heading = await waitForElm("#Big_alphabets");
    let h2 = document.createElement("h2");
    h2.setAttribute("class", "head hidden");
    h2.textContent = letter;
    Big_alphabets_heading.appendChild(h2);
    let ul = document.createElement("ul");
    ul.setAttribute(
      "class",
      "uls inset-y-20 text-lg font-bold flex flex-col mx-auto w-full text-gray-800 rounded-md p-2 shadow-md transition duration-500 ease-in-out"
    );
    for (let word of groupedWords[letter]) {
      let anc = document.createElement("a");
      anc.setAttribute("href", links[word]);
      anc.setAttribute("target", "_blank");
      let li = document.createElement("li");
      li.setAttribute(
        "class",
        "resource text-left mb-2 ml-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer transition duration-500 ease-in-out"
      );
      li.innerHTML = word;
      anc.appendChild(li);
      ul.appendChild(anc);
      Big_alphabets_heading.appendChild(ul);
    }
  }
}
var displayWordsArr = [];
var links = {};
fetch('/api/navbar')
  .then(async (res) => await res.json())
  .then((data) => {
    Object.keys(data).forEach(key => {
      for(let i=0;i<data[key].length;i++){
        for(let j=2;j<data[key][i].length;j++){
          // console.log(data[key][i][j].name)
          // console.log(data[key][i][j].link)
          data[key][i][j].name = data[key][i][j].name+" <span class=\"material-symbols-outlined align-middle\" >open_in_new</span>";
          displayWordsArr.push(data[key][i][j].name);
          links[data[key][i][j].name] = data[key][i][j].link;
        }
      }
    });
  })
dept_list = ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai'];
for (let dept of dept_list) {
  fetch(`/api/dept/${dept}/Faculty`)
  .then((response) => response.json())
  .then((data) => {
    // Create an unordered list element
    data.forEach((element) => {
      element["ID"]["name"] = element["ID"]["name"]+" <span class=\"material-symbols-outlined align-middle\">person</span>";
      displayWordsArr.push(element["ID"]["name"]);
      links[element["ID"]["name"]] = `https://departments.nitj.ac.in/dept/${dept}/Faculty/${element["ID"]["_id"]}`;
    });
    // Loop through the properties of the data object
  });
}
var resources = document.getElementById("resources");
fetch('/api/resource')
  .then((response) => response.json())
  .then((data) => {
    // Create an unordered list element
    data.forEach((element) => {
      if (element.resourceType === "other") {
        element["resourceName"] = element["resourceName"]+" <span class=\"material-symbols-outlined align-middle\">picture_as_pdf</span>";
        displayWordsArr.push(element["resourceName"]);
        links[element["resourceName"]] = element["resourceLink"];
      }
    });
    displayWords(displayWordsArr, links);
    // Loop through the properties of the data object
  });
function search_resources() {
  let input_element = document.getElementById("searchbar");
  let input = document.getElementById("searchbar").value;
  input = input.replace(/[^\w\s]/g, "").toLowerCase(); // Removing special characters and convert to lowercase
  let searchTerms = input.split(/\s+/).filter(term => term !== ""); // Spliting input into search terms
  // if(!input_element.reportValidity()){
    display_resources();
    // return;
  // }

  let x = document.getElementsByClassName("resource");
  let header = document.getElementsByClassName("head");
  let uls = document.getElementsByClassName("uls");
    for (let i = 0; i < x.length; i++) {
    let resourceContent = x[i].innerHTML.toLowerCase().replace(/[^\w\s]/g, "");
    let showResource = true;

    for (let term of searchTerms) {
      if (!resourceContent.includes(term)) {
        showResource = false;
        break;
      }
    }

    if (showResource) {
      x[i].style.display = "list-item";
    } else {
      x[i].style.display = "none";
    }
  }

  var count = 0;
  for (let j = 0; j < header.length; j++) {
    let ancItems = header[j].nextElementSibling.children;
    let allHidden = true;
    for (let k = 0; k < ancItems.length; k++) {
      if (ancItems[k].firstChild.style.display != "none") {
        allHidden = false;
        break;
      }
    }
    if (allHidden) {
      count++;
      header[j].style.display = "none";
      uls[j].classList.add("hidden");
    } else {
      uls[j].classList.remove("hidden");
    }

    if (count == header.length) {
      let noresult = document.getElementById("noresult");
      noresult.classList.remove("hidden");
      // show no result found
    } else {
      let noresult = document.getElementById("noresult");
      noresult.classList.add("hidden");
    }
  }
}

function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL}, 'google_translate_element');
}

// once google translate element is initialized, remove the google translate logo
document.addEventListener("DOMContentLoaded", function() {
  // console.log("DOM loaded, waiting for google translate element to initialize");
  waitForElm(".goog-te-gadget").then(elm => {
    // console.log("google translate element initialized");
    var goog_gadget =  document.getElementsByClassName('goog-te-gadget')[0];
    // console.log(goog_gadget.childNodes)
    //just keep the child node 0 remove rest
    for (var i = 1; i < goog_gadget.childNodes.length; i++) {
      goog_gadget.removeChild(goog_gadget.childNodes[i]);
    }
    goog_gadget.removeChild(goog_gadget.lastChild);
    // console.log(goog_gadget.childNodes)
  });
});




// Include the script source for Google Translate
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

// Append the script to the document body
document.body.appendChild(script);