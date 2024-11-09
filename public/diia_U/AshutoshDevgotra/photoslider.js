const eventsContainer = document.getElementById("eventsContainer");

// Fetch and render data
async function fetchImageData() {
  try {
<<<<<<< HEAD
    const response = await fetch("/api/diia/gallery");
=======
    const response = await fetch(
      "/api/diia/gallery"
    );
>>>>>>> bafdb11614ba9033980b3e1d5393c4a4d69b42a3
    if (!response.ok) throw new Error("Failed to fetch data");

    const imageData = await response.json();
    renderSliderImages(imageData);
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
}

// Render sorted images by event date
function renderSliderImages(imageData) {
  const sliderImages = imageData
    .filter((event) => event.showInslider)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)); // Sort by eventDate (most recent first)

  sliderImages.forEach((event) => {
    const eventSection = document.createElement("div");
    eventSection.classList.add("mb-12");

    // Event title in blue
    const title = document.createElement("h2");
    title.classList.add(
      "text-3xl",
      "font-semibold",
      "px-3",
      "mt-8",
      "mb-2",
      "text-blue-500"
    );
    title.textContent = event.title;
    eventSection.appendChild(title);

    // Event date in gray and smaller font size
    const date = document.createElement("p");
    date.classList.add("text-sm", "px-3", "mb-4", "text-gray-500");

    const eventDate = new Date(event.eventDate);
    const formattedDate = `${String(eventDate.getDate()).padStart(
      2,
      "0"
    )}-${String(eventDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${eventDate.getFullYear()}`;

    // Use innerHTML to make only "Event Date:" bold
    date.innerHTML = `<span class="font-bold">Event Date:</span> ${formattedDate}`;

    eventSection.appendChild(date);

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
