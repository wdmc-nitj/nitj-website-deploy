document.addEventListener("DOMContentLoaded", function () {
  fetch("./navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });
});

let images = [];
let currentImageIndex = 0;
const slideInterval = 3000;

async function fetchData() {
  try {
    const response = await fetch(
      `https://nitjfinal.onrender.com/api/diia/hero-slider`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    images = data.map((item) => ({
      src: item.Image,
      title: item.title1,
    }));
    console.log(images);
    renderImage(currentImageIndex);
    renderIndicators();
    startAutoSlide();
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
}

function renderImage(index) {
  const carouselInner = document.getElementById("carousel-images");
  carouselInner.innerHTML = "";

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("relative", "w-full", "h-full");

  const imgElement = document.createElement("img");
  imgElement.src = images[index].src;
  imgElement.alt = `Slide ${index + 1}`;
  imgElement.classList.add("object-cover", "w-full", "h-full");

  const gradientOverlay = document.createElement("div");
  gradientOverlay.classList.add(
    "absolute",
    "bottom-0",
    "left-0",
    "right-0",
    "h-48",
    "bg-gradient-to-t",
    "from-black",
    "to-transparent"
  );

  const titleElement = document.createElement("div");
  titleElement.classList.add(
    "absolute",
    "bottom-20",
    "left-1/2",
    "transform",
    "-translate-x-1/2",
    "text-white",
    "text-xl",
    "font-bold",
    "leading-none",
    "p-2"
  );
  titleElement.textContent = images[index].title;

  imgContainer.appendChild(imgElement);
  imgContainer.appendChild(gradientOverlay);
  imgContainer.appendChild(titleElement);
  carouselInner.appendChild(imgContainer);

  updateActiveIndicator(index);
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  renderImage(currentImageIndex);
}

function startAutoSlide() {
  setInterval(nextImage, slideInterval);
}

function renderIndicators() {
  const indicatorsContainer = document.getElementById("carousel-indicators");
  images.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add(
      "h-3",
      "w-3",
      "bg-gray-500",
      "m-[1px]",
      "rounded-full"
    );
    indicator.dataset.index = index;
    indicator.onclick = () => {
      currentImageIndex = index;
      renderImage(currentImageIndex);
    };
    indicatorsContainer.appendChild(indicator);
  });
}

function updateActiveIndicator(index) {
  const indicators = document.querySelectorAll("#carousel-indicators div");
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("bg-white", i === index);
    indicator.classList.toggle("bg-gray-500", i !== index);
  });
}

fetchData();
