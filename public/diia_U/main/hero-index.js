// added navbar
// document.addEventListener("DOMContentLoaded", function () {
//   fetch("./navbar.html")
//     .then((response) => response.text())
//     .then((data) => {
//       document.getElementById("navbar").innerHTML = data;
//     });
// });
// fetched data
// const images = [
//     { src: "./assets/nitjb.jpg", title: "Title 1" },
//     { src: "./assets/maxresdefault (3).jpg", title: "Title 2" },
//     { src: "./assets/event.jpg", title: "Title 3" },
//     { src: "./assets/another-image.jpg", title: "Title 4" }, // Add more images if needed
// ];

let images = []; // Initialize an empty array for images
let currentImageIndex = 0; // Initializing the carousel

async function fetchData() {
  try {
    const response = await fetch(`/api/diia/hero-slider`);
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    // Extract image link and title from the fetched data
    images = data.map((item) => ({
      src: item.Image, // Image link
      title: item.title1, // Title
    }));
    console.log(images);
    renderImage(currentImageIndex); // Render the first image after fetching
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
}

// Function to render an image in the carousel
function renderImage(index) {
  const carouselInner = document.getElementById("carousel-images");
  carouselInner.innerHTML = ""; // Clear current image

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("relative", "w-full", "h-full");

  const imgElement = document.createElement("img");
  imgElement.src = images[index].src; // Use the dynamically fetched image URL
  imgElement.alt = `Slide ${index + 1}`;
  imgElement.classList.add("object-cover", "w-full", "h-full");

  // Create the gradient overlay
  const gradientOverlay = document.createElement("div");
  gradientOverlay.classList.add(
    "absolute",
    "top-0",
    "left-0",
    "right-0",
    "bottom-0",
    "bg-black",
    "opacity-50"
  );

  const titleElement = document.createElement("div");
  titleElement.classList.add(
    "absolute",
    "bottom-20",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "text-white",
    "text-2xl",
    "font-bold",
    "p-4"
  );
  titleElement.textContent = images[index].title; // Set the title text

  imgContainer.appendChild(imgElement);
  imgContainer.appendChild(gradientOverlay);
  imgContainer.appendChild(titleElement); // Add title to container
  carouselInner.appendChild(imgContainer);
}

// Function to go to the next image
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  renderImage(currentImageIndex);
}

// Function to go to the previous image
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  renderImage(currentImageIndex);
}

// Attach event listeners for next/prev buttons
document.getElementById("carousel-next").addEventListener("click", nextImage);
document.getElementById("carousel-prev").addEventListener("click", prevImage);

// Fetch data and render the initial image
fetchData();
