function handleMenu() {
  const navDialog = document.getElementById("nav-dialog");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  // Toggle the visibility of the mobile menu
  if (navDialog.classList.contains("hidden")) {
    navDialog.classList.remove("hidden");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
  } else {
    navDialog.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  }
}

function genLogo() {
  let aStyle = "flex items-center gap-1 md:scale-90 custom-font-reduce";

  let a = document.createElement("a");
  a.setAttribute("class", aStyle);
  a.setAttribute("href", "/diia_U/main/oiia.html");
  a.setAttribute("target", "_blank");
  a.setAttribute("id", "brand");

  let imgStyle =
    "h-10 md:h-12 w-auto object-contain hover:scale-110 custom-logo-reduce -ml-5 mr-2";
  let img = document.createElement("img");
  img.setAttribute("class", imgStyle);
  img.setAttribute("src", "/diia_U/main/assets/logo.png");
  img.setAttribute("alt", "logo");

  let spanStyle =
    "text-[8px] whitespace-nowrap md:text-[10px] lg:text-[14px] font-barlow font-bold text-blue-900 items-center custom-font-reduce mr-5";
  let span = document.createElement("span");
  span.setAttribute("class", spanStyle);
  span.innerHTML = "OFFICE OF INDUSTRY AND INTERNATIONAL AFFAIRS";

  a.appendChild(img);
  a.appendChild(span);

  return a;
}

function genHomeButton() {
  let a = document.createElement("a");
  a.setAttribute("href", "/diia_U/main/oiia.html");
  a.setAttribute("target", "_blank");

  let div = document.createElement("div");
  div.setAttribute(
    "class",
    "items-center hover:text-blue-800 custom-font-reduce"
  );
  let i = document.createElement("i");
  i.setAttribute("class", "fa-solid fa-house");
  div.appendChild(i);
  a.appendChild(div);

  return a;
}

function genHomeButtonLARGE() {
  let div = document.createElement("div");
  div.setAttribute("class", "hidden lg:flex md:flex custom-font-reduce");

  let a = document.createElement("a");
  a.setAttribute("href", "/");
  a.setAttribute("target", "_blank");
  let button = document.createElement("button");
  button.setAttribute(
    "class",
    "border whitespace-nowrap rounded-lg hover:bg-blue-700 bg-gradient-to-r from-blue-900 to-blue-700 px-3 py-2 md:text-[10px] lg:test-[12px] font-bold shadow-sm text-white custom-font-reduce"
  );
  button.innerHTML = "NITJ Home";
  a.appendChild(button);
  div.appendChild(a);

  return div;
}

function genDropdowns(edata) {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    "relative group px-2 custom-font-reduce flex justify-center"
  );

  let a = document.createElement("a");
  a.setAttribute(
    "class",
    "hover:text-blue-600 bg-white cursor-pointer group transition-all rounded-full uppercase flex items-center custom-font-reduce text-[8px] md:text-[10px] lg:text-[14px] font-medium text-[#00387A] whitespace-nowrap"
  );
  a.style.fontSize = "1vw";
  a.setAttribute("href", edata.link);
  a.setAttribute("target", "_blank");
  a.innerHTML = edata.title + '<i class="fa p-1 fa-chevron-down"></i>';

  let div2 = document.createElement("div");
  div2.setAttribute(
    "class",
    "absolute hidden bg-white flex-col rounded-lg transition-all group-hover:flex shadow-slate-500 shadow-sm overflow-hidden border-2 hover:border-blue-500 py-1 custom-font-reduce md:w-[10rem] lg:w-[13rem] left-1/2 transform -translate-x-1/2 top-[80%] mt-1" // Added top-full and mt-1 for positioning
  );
  edata.submenus.sort((a,b)=> a.order - b.order)
  for (let x in edata.submenus) {
    let a2 = document.createElement("a");
    a2.setAttribute("href", edata.submenus[x].link);
    a2.setAttribute("target", "_blank");
    a2.setAttribute(
      "class",
      "text-sm text-blue-700 hover:text-blue-500 hover:bg-blue-50 m-1 px-5 whitespace-nowrap custom-font-reduce py-1.5 rounded"
    );
    a2.innerHTML = edata.submenus[x].title;
    div2.appendChild(a2);
  }

  div.appendChild(a);
  div.appendChild(div2);
  return div;
}

function genMenuItem(name) {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    "relative group hover:text-blue-600 custom-font-reduce "
  );
  let a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("target", "_blank");
  a.setAttribute(
    "class",
    "relative px-2 bg-white cursor-pointer group transition-all rounded-full custom-font-reduce uppercase"
  );
  a.innerHTML = name;
  let div2 = document.createElement("div");
  div2.setAttribute(
    "class",
    "absolute top-5 bottom-0 left-0 w-full h-[4px] rounded-full bg-transparent group-hover:bg-blue-700 transition-all duration-300"
  );
  a.appendChild(div2);
  div.appendChild(a);

  return div;
}

function genMobileMenuToggle() {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    "relative z-50 hover:bg-blue-700 bg-gradient-to-r from-blue-900 to-blue-700 rounded-lg hiddenx lg:hidden md:hidden custom-font-reduce"
  );

  let button1 = document.createElement("button");
  button1.setAttribute("id", "hamburger-icon");
  button1.setAttribute("class", "px-2 py-1");
  button1.setAttribute("onclick", "handleMenu()");
  let i1 = document.createElement("i");
  i1.setAttribute("class", "fa-solid fa-bars text-white text-sm");
  button1.appendChild(i1);
  div.appendChild(button1);

  let button2 = document.createElement("button");
  button2.setAttribute("id", "close-icon");
  button2.setAttribute("class", "px-2 py-1 hidden");
  button2.setAttribute("onclick", "handleMenu()");
  let i2 = document.createElement("i");
  i2.setAttribute("class", "fa-solid fa-xmark text-white text-sm");
  button2.appendChild(i2);
  div.appendChild(button2);

  return div;
}
function genMobileMenu(items) {
  let div = document.createElement("div");
  div.setAttribute("id", "nav-dialog");
  div.setAttribute(
    "class",
    "fixed inset-x-0 top-16 p-3 bg-blue-50 text-black z-50 hidden lg:hidden md:hidden shadow-lg rounded-lg custom-font-reduce max-w-xs mx-auto" // Added max-w-sm and mx-auto
  );

  let menuContainer = document.createElement("div");
  menuContainer.setAttribute("class", "mt-4 flex flex-col items-center");

  items.forEach((item) => {
    // Container for main menu item and dropdown toggle
    let mainItemContainer = document.createElement("div");
    mainItemContainer.setAttribute(
      "class",
      "relative flex justify-between items-center p-3 mt-3 font-medium border-2 border-blue-500 rounded-lg hover:bg-blue-100 custom-font-reduce w-full"
    );

    // Main menu link
    let mainLink = document.createElement("a");
    mainLink.setAttribute("href", item.link || "#");
    mainLink.setAttribute("target", "_blank");
    mainLink.setAttribute("class", "text-blue-700 hover:text-blue-500");
    mainLink.innerHTML = item.title;

    mainItemContainer.appendChild(mainLink);

    // Dropdown icon
    if (item.submenus && item.submenus.length > 0) {
      let dropdownIcon = document.createElement("span");
      dropdownIcon.setAttribute("class", "cursor-pointer text-blue-700 pl-2");
      dropdownIcon.innerHTML = '<i class="fa fa-chevron-down"></i>';

      mainItemContainer.appendChild(dropdownIcon);

      // Submenu container with reduced width for mobile
      let submenuContainer = document.createElement("div");
      submenuContainer.setAttribute(
        "class",
        "absolute left-0 right-0 top-full mt-2 bg-white shadow-md rounded-lg hidden transition-all duration-300 z-40 max-w-xs mx-auto"
      );

      item.submenus.forEach((submenu) => {
        let submenuLink = document.createElement("a");
        submenuLink.setAttribute("href", submenu.link || "#");
        submenuLink.setAttribute("target", "_blank");
        submenuLink.setAttribute(
          "class",
          "block p-2 text-blue-700 hover:text-blue-500 hover:bg-blue-100 rounded custom-font-reduce"
        );
        submenuLink.innerHTML = submenu.title;
        submenuContainer.appendChild(submenuLink);
      });

      // Toggle submenu visibility on dropdown icon click
      dropdownIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering main link
        submenuContainer.classList.toggle("hidden");
        dropdownIcon.innerHTML = submenuContainer.classList.contains("hidden")
          ? '<i class="fa fa-chevron-down"></i>'
          : '<i class="fa fa-chevron-up"></i>';
      });

      mainItemContainer.appendChild(submenuContainer);
    }

    menuContainer.appendChild(mainItemContainer);
  });

  div.appendChild(menuContainer);
  return div;
}

document.addEventListener("DOMContentLoaded", genNav);
async function genNav() {
  let nav = document.createElement("nav");
  nav.setAttribute(
    "class",
    "bg-white flex mx-auto px-4 md:px-3 py-1.5 left-0 right-0 top-0 justify-between items-center drop-shadow-2xl z-50 fixed shadow-black w-full custom-font-reduce"
  );
  nav.setAttribute("id", "navscript-bar");

  nav.appendChild(genLogo());

  let navbarDiv = document.createElement("div");
  navbarDiv.setAttribute("id", "nav-bar");
  navbarDiv.setAttribute(
    "class",
    "flex items-center hidden md:flex md:text-sm h-fit gap-3 sm:gap-2 custom-font-reduce"
  );
  navbarDiv.appendChild(genHomeButton());

  let mobileMenuData = []; // Store full data structure for mobile menu

  try {
    const response = await fetch("/api/diia/navbar", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      const data = await response.json();
      if (data) {
        mobileMenuData = data; // Use the full data structure for mobile menu
        for (let x in data) navbarDiv.appendChild(genDropdowns(data[x]));
      }
    }
  } catch (e) {
    console.log(e);
  }

  navbarDiv.appendChild(genHomeButtonLARGE());
  nav.appendChild(genMobileMenuToggle());
  nav.appendChild(genMobileMenu(mobileMenuData)); // Pass the full data structure to genMobileMenu

  nav.appendChild(navbarDiv);
  document.body.appendChild(nav);
}
