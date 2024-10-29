const eventsContainer = document.getElementById("eventsContainer");

// Fetch data from backend
async function fetchImageData() {
  try {
    const response = await fetch("/api/diia/gallery"); // Replace with your backend endpoint
    if (!response.ok) throw new Error("Failed to fetch data");

    const imageData = await response.json();

    // Filter and render images as before
    renderSliderImages(imageData);
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
}

// Render images dynamically
function renderSliderImages(imageData) {
  const sliderImages = imageData.filter((event) => event.showInslider);

  sliderImages.forEach((event) => {
    const eventSection = document.createElement("div");
    eventSection.classList.add("mb-12");

    const title = document.createElement("h2");
    title.classList.add("text-3xl", "font-semibold", "px-3", "mt-8", "mb-4");
    title.textContent = event.title;
    eventSection.appendChild(title);

    const imageGrid = document.createElement("div");
    imageGrid.classList.add(
      "grid",
      "grid-cols-2",
      "sm:grid-cols-4",
      "gap-4",
      "px-3"
    );

    event.urls.forEach((url, index) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = `${event.title} image ${index + 1}`;
      img.classList.add(
        "cursor-pointer",
        "w-full",
        "h-auto",
        "rounded-lg",
        "shadow-lg",
        "hover:opacity-75"
      );
      img.onclick = () => openImage(event.urls, index);
      imageGrid.appendChild(img);
    });

    eventSection.appendChild(imageGrid);
    eventsContainer.appendChild(eventSection);
  });
}

// Call fetchImageData on load
fetchImageData();

// Modal and slider functions remain unchanged
let currentImageIndex = 0;
let currentImages = [];

function openImage(urls, index) {
  currentImages = urls;
  currentImageIndex = index;
  document.getElementById("sliderImage").src = currentImages[currentImageIndex];
  document.getElementById("imageModal").classList.remove("hidden");
  addBlur();
}

function closeModal() {
  document.getElementById("imageModal").classList.add("hidden");
  removeBlur();
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  document.getElementById("sliderImage").src = currentImages[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  document.getElementById("sliderImage").src = currentImages[currentImageIndex];
}

function addBlur() {
  Array.from(document.body.children).forEach((element) => {
    if (!element.id.includes("imageModal")) element.classList.add("blur");
  });
  document.getElementById("overlay").classList.remove("hidden");
}

function removeBlur() {
  Array.from(document.body.children).forEach((element) => {
    element.classList.remove("blur");
  });
  document.getElementById("overlay").classList.add("hidden");
}
