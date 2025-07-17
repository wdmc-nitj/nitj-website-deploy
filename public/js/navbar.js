// getNavbar.js
import createNavMob from './navbar-mobile.js';

export default async function getNavbar() {
  const data = await fetch('/api/navbar').then(r => r.json());
  createNav(data);
  createNavMob(data);

  // Wait for DOM to be fully updated with menu data before enabling touch
  setTimeout(() => {
    // enable "tap to open" on pure‐touch devices
    enableTouchDropdowns();
  }, 300);
}

async function createNav(obj) {
  let data = await obj;

  const menu1 = document.getElementById('menu-1');
  const Administration = document.getElementById('Administration');
  const dropdown1 = document.createElement('div');
  dropdown1.setAttribute(
    'class',
    'absolute hidden gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex dropdown-menu'
  );
  dropdown1.setAttribute('id', 'drop-down');
  data['Administration'].forEach(array => navbarhelper(array, dropdown1));
  menu1.appendChild(Administration);
  menu1.appendChild(dropdown1);

  const menu2 = document.getElementById('menu-2');
  const Academics = document.getElementById('Academics');
  const dropdown2 = document.createElement('div');
  dropdown2.setAttribute(
    'class',
    'absolute hidden -translate-x-28 gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex dropdown-menu'
  );
  dropdown2.setAttribute('id', 'drop-down');
  data['Academics'].forEach(array => navbarhelper(array, dropdown2));
  menu2.appendChild(Academics);
  menu2.appendChild(dropdown2);

  const menu3 = document.getElementById('menu-3');
  const Admissions = document.getElementById('Admissions');
  const dropdown3 = document.createElement('div');
  dropdown3.setAttribute(
    'class',
    'absolute hidden -translate-x-1/3 gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex dropdown-menu'
  );
  dropdown3.setAttribute('id', 'drop-down');
  data['Admissions'].forEach(array => navbarhelper(array, dropdown3));
  menu3.appendChild(Admissions);
  menu3.appendChild(dropdown3);

  const menu4 = document.getElementById('menu-4');
  const Research = document.getElementById('Research');
  const dropdown4 = document.createElement('div');
  dropdown4.setAttribute(
    'class',
    'absolute hidden -translate-x-1/2 gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex dropdown-menu'
  );
  dropdown4.setAttribute('id', 'drop-down');
  data['Research'].forEach(array => navbarhelper(array, dropdown4));
  menu4.appendChild(Research);
  menu4.appendChild(dropdown4);

  const menu5 = document.getElementById('menu-5');
  const Alumni = document.getElementById('Alumni');
  const dropdown5 = document.createElement('div');
  dropdown5.setAttribute(
    'class',
    'absolute hidden -translate-x-1/2 gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex dropdown-menu'
  );
  dropdown5.setAttribute('id', 'drop-down');
  data['Alumni'].forEach(array => navbarhelper(array, dropdown5));
  menu5.appendChild(Alumni);
  menu5.appendChild(dropdown5);

  const menu6 = document.getElementById('menu-6');
  const LifeatNITJ = document.getElementById('Life at NITJ');
  const dropdown6 = document.createElement('div');
  dropdown6.setAttribute(
    'class',
    'absolute hidden gap-5 bg-white p-5 text-sm shadow-sm group-hover:flex right-0 dropdown-menu'
  );
  dropdown6.setAttribute('id', 'drop-down');
  data['LifeatNITJ'].forEach(array => navbarhelper(array, dropdown6));
  menu6.appendChild(LifeatNITJ);
  menu6.appendChild(dropdown6);
}

const merge = document.createElement('div');
merge.setAttribute('class', '');

let prevCol = null;
function navbarhelper(array, dropdown) {
  const col = document.createElement('div');
  col.setAttribute('id', 'col');
  col.setAttribute(
    'class',
    'flex flex-col h-full w-52 gap-5 border-2 rounded-b-xl border-accent hover:bg-orange-500 hover:border-orange-500'
  );

  const block = document.createElement('div');
  block.setAttribute('id', 'block');
  block.setAttribute('class', 'min-h-full');

  const head = document.createElement('div');
  head.setAttribute(
    'class',
    'rounded-b-xl h-full overflow-clip bg-accent hover:bg-orange-500 uppercase'
  );
  head.setAttribute('id', 'head');
  head.innerHTML = `<div class="p-2 text-center">${array[0]}</div>`;

  const listdiv = document.createElement('div');
  listdiv.setAttribute('class', 'h-full rounded-b-xl bg-white normal-case');

  const list = document.createElement('ul');
  list.setAttribute(
    'class',
    'flex flex-col min-h-full gap-1 px-2 font-normal text-black'
  );
  for (let i = 2; i < array.length; i++) {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'hover:text-[#FF6600]');
    listItem.innerHTML = `<a ${
      array[i]?.newPage ? "target='_blank'" : ''
    } href="${array[i].link}">${array[i].name}</a>`;
    list.appendChild(listItem);
  }

  const bigCol = document.createElement('div');
  bigCol.setAttribute('class', 'flex flex-col gap-5 min-h-full');

  listdiv.appendChild(list);
  head.appendChild(listdiv);
  block.appendChild(head);
  col.appendChild(block);
  bigCol.appendChild(col);

  array[1] ? prevCol.appendChild(col) : (prevCol = bigCol);
  if (!array[1]) dropdown.appendChild(bigCol);
}


/* ── TOUCH‐ONLY "TAP → OPEN" HANDLERS ──────────────────────── */
function enableTouchDropdowns() {
  if (enableTouchDropdowns.done) return;
  enableTouchDropdowns.done = true;

  // only run on real touch devices that cannot hover
  if (!window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return;
  }

  console.log('Touch device detected - enabling touch dropdowns');

  // Find all the dropdown menus
  const dropdownMenus = document.querySelectorAll('.dropdown-menu');
  console.log(`Found ${dropdownMenus.length} dropdown menus`);
  
  // Configure all dropdown menus for touch
  dropdownMenus.forEach(menu => {
    // Remove hover behavior and ensure proper initial state
    menu.classList.remove('group-hover:flex');
    menu.classList.add('hidden');
    menu.style.display = 'none';
  });
  
  // Find all menu containers (with ID menu-1, menu-2, etc.)
  const menuContainers = document.querySelectorAll('[id^="menu-"]');
  
  menuContainers.forEach(container => {
    // Skip the menu-content container which has different structure
    if (container.id === 'menu-content') return;
    
    // Find the direct children - first should be heading, second should be dropdown
    const children = Array.from(container.children);
    if (children.length < 2) {
      console.log(`Container ${container.id} doesn't have enough children:`, children.length);
      return;
    }
    
    const heading = children[0]; // First child should be the heading
    const dropdown = children[1]; // Second child should be the dropdown
    
    console.log(`Setting up ${container.id}:`, heading.id, 'with dropdown:', dropdown.className);
    
    // Attach click handler to the heading
    heading.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`${heading.id || heading.textContent} clicked!`);
      
      // Close all other dropdowns first
      dropdownMenus.forEach(menu => {
        if (menu !== dropdown) {
          menu.classList.add('hidden');
          menu.style.display = 'none';
        }
      });
      
      // Toggle this dropdown
      const isCurrentlyHidden = dropdown.classList.contains('hidden');
      if (isCurrentlyHidden) {
        console.log('Opening dropdown');
        dropdown.classList.remove('hidden');
        dropdown.style.display = 'flex';
      } else {
        console.log('Closing dropdown');
        dropdown.classList.add('hidden');
        dropdown.style.display = 'none';
      }
    });
    
    // Prevent clicks in dropdown from closing it
    dropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
  
  // Close all dropdowns when clicking elsewhere
  document.addEventListener('click', function(e) {
    // If the clicked element is not inside any menu container
    if (!e.target.closest('[id^="menu-"]')) {
      console.log('Clicked outside menus - closing all');
      dropdownMenus.forEach(menu => {
        menu.classList.add('hidden');
        menu.style.display = 'none';
      });
    }
  });
}