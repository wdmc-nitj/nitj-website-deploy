let data = [];
let currentIndex = 0;
// const url = "https://nitjfinal.onrender.com";
const furl = "https://nitjfinal.onrender.com";
// async function fetchData() {
//   try {
//     const response = await fetch(`${url}/api/diia/news-section`);
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }
//     data = await response.json();
//     console.log("Fetched Data:", data);
//     initSlider();
//     populateList();
//   } catch (error) {
//     console.error("Failed to fetch data:", error);
//   }
// }
async function fetchData() {
  try {
    const response = await fetch(`/api/diia/news-section`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    data = await response.json();
    console.log("Fetched Data:", data);

    // Sort data based on createdAt and take the latest 4 items
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dataSlider = data.slice(0, 4); // Take the most recent 4 items
    console.log(data);
    initSlider(dataSlider);
    populateList(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function initSlider(dataSlider) {
  const imageContainer = document.getElementById("imageContainer");
  const indicatorsContainer = document.getElementById("indicators");

  if (!imageContainer || !indicatorsContainer) {
    console.error("Slider elements not found");
    return;
  }

  imageContainer.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  if (dataSlider.length === 0) {
    console.warn("No data available for slider");
    return;
  }

  dataSlider.forEach((elt, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = elt.Image;
    imgElement.alt = `Stack Image ${index + 1}`;
    imgElement.className = `absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000`;
    if (index === 0) imgElement.classList.add("opacity-100");
    imageContainer.appendChild(imgElement);

    const indicator = document.createElement("span");
    indicator.className = `w-3 h-3 rounded-full bg-gray-500 ${
      index === 0 ? "bg-white" : ""
    }`;
    indicatorsContainer.appendChild(indicator);
  });
}

function updateSlider() {
  if (dataSlider.length === 0) {
    console.warn("No data available for slider update");
    return;
  }

  document.querySelectorAll("#imageContainer img").forEach((img, index) => {
    img.classList.toggle("opacity-100", index === currentIndex);
    img.classList.toggle("opacity-0", index !== currentIndex);
  });

  const currentImage = data[currentIndex];
  document.getElementById("heading").textContent = currentImage.title1;

  document.getElementById(
    "headingLink"
  ).href = ` ${furl}/diia_U/template.html?id=${currentImage._id}?category=news-section`;

  document.querySelectorAll("#indicators span").forEach((indicator, index) => {
    indicator.classList.toggle("bg-white", index === currentIndex);
    indicator.classList.toggle("bg-gray-500", index !== currentIndex);
  });

  currentIndex = (currentIndex + 1) % dataSlider.length;
}

function populateList(data) {
  const list = document.getElementById("list");

  if (!list) {
    console.error("List element not found");
    return;
  }

  list.innerHTML = "";

  data.forEach((item) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.className =
      "underline underline-offset-4 decoration-accent decoration-0 hover:decoration-2 text-lg";
    link.href = ` ${furl}/diia_U/template.html?id=${item._id}?category=news-section`;
    link.textContent = item.title1;

    const newTagDiv = document.createElement("div");
    newTagDiv.className =
      "inline-flex ml-2 items-center justify-start space-x-2";

    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-accent-orange";
    iconSpan.innerHTML = `
      <svg fill="#ff9905" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
      </svg>
    `;

    const newText = document.createElement("p");
    newText.className = "text-lg font-bold uppercase text-[#ff9905]";
    newText.textContent = "New";

    newTagDiv.appendChild(iconSpan);
    newTagDiv.appendChild(newText);

    listItem.appendChild(link);
    listItem.appendChild(newTagDiv);

    list.appendChild(listItem);
  });
}

fetchData();
setInterval(updateSlider, 3000);
