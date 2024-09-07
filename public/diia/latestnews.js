//    async function fetchImages() {
//   try {
//     const response = await fetch('https://your-backend-endpoint.com/api/images');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const images = await response.json();
//
//   } catch (error) {
//     console.error('Failed to fetch images:', error);
//   }
// }
const images = [
  {
    url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    heading: "Heading 1",
    link: "https://example.com/page1",
  },
  {
    url: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    heading: "Heading 2",
    link: "https://example.com/page2",
  },
  {
    url: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    heading: "Heading 3",
    link: "https://example.com/page3",
  },
  {
    url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    heading: "Heading 4",
    link: "https://example.com/page4",
  },
];

let currentIndex = 0;

function initSlider() {
  // Populate images
  const imageContainer = document.getElementById("imageContainer");
  images.forEach((image, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.url;
    imgElement.alt = `Stack Image ${index + 1}`;
    imgElement.className = `absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000`;
    if (index === 0) imgElement.classList.add("opacity-100");
    imageContainer.appendChild(imgElement);
  });

  // Populate indicators
  const indicatorsContainer = document.getElementById("indicators");
  images.forEach((_, index) => {
    const indicator = document.createElement("span");
    indicator.className = `w-3 h-3 rounded-full bg-gray-500 ${
      index === 0 ? "bg-white" : ""
    }`;
    indicatorsContainer.appendChild(indicator);
  });
}

function updateSlider() {
  // Update images' opacity
  document.querySelectorAll("#imageContainer img").forEach((img, index) => {
    img.classList.toggle("opacity-100", index === currentIndex);
    img.classList.toggle("opacity-0", index !== currentIndex);
  });

  // Update heading and link
  const currentImage = images[currentIndex];
  document.getElementById("heading").textContent = currentImage.heading;
  document.getElementById("headingLink").href = currentImage.link;

  // Update indicators
  document.querySelectorAll("#indicators span").forEach((indicator, index) => {
    indicator.classList.toggle("bg-white", index === currentIndex);
    indicator.classList.toggle("bg-gray-500", index !== currentIndex);
  });

  // Move to the next image
  currentIndex = (currentIndex + 1) % images.length;
}

initSlider();
setInterval(updateSlider, 3000);
updateSlider(); // Initialize slider on load

// for navigation Headers

const currentLink = document.getElementById("page-heading");
currentLink.textContent = "Latest News";
currentLink.href = window.location.href;

// To render latest news
// Sample data structure
const data = [
  { heading: "First Link", url: "https://example.com/first" },
  { heading: "Second Link", url: "https://example.com/second" },
  { heading: "Third Link", url: "https://example.com/third" },
];

// Function to dynamically add items to the list
function populateList() {
  const list = document.getElementById("list");

  // Clear any existing content
  list.innerHTML = "";

  // Loop through each item in the data array
  data.forEach((item) => {
    // Create a new <li> element
    const listItem = document.createElement("li");

    // Create a new <a> element for the hyperlink
    const link = document.createElement("a");
    link.className =
      "underline underline-offset-4 decoration-accent decoration-0 hover:decoration-2";
    link.href = item.url;
    link.textContent = item.heading;

    // Create the new-tag div structure
    const newTagDiv = document.createElement("div");
    newTagDiv.className =
      "inline-flex ml-2 items-center justify-start space-x-2";

    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-accent-orange";

    const svgIcon = `
            <svg fill="#ff9905" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
            </svg>
        `;

    iconSpan.innerHTML = svgIcon;

    const newText = document.createElement("p");
    newText.className = "text-lg font-bold uppercase text-[#ff9905]";
    newText.textContent = "New";

    // Append the icon and text to the newTagDiv
    newTagDiv.appendChild(iconSpan);
    newTagDiv.appendChild(newText);

    // Append the link and new-tag div to the list item
    listItem.appendChild(link);
    listItem.appendChild(newTagDiv);

    // Append the list item to the main list
    list.appendChild(listItem);
  });
}

// Call the function to populate the list
populateList();
