let news = [];

async function fetchData() {
  try {
    const response = await fetch(`/api/diia/opportunities`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    news = await response.json();
    console.log("Fetched Data:", news);
    renderCards();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function renderCards() {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  cardsWrapper.innerHTML = "";

  news.forEach((newElt) => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.classList.add("m-auto");

    card.innerHTML = `
      <div class="card-Image">
        <img  src="${newElt.Image}" alt="News Image" />
      </div>
      <div class="text-area">
        <h2 class="heading">${newElt.title1}</h2>
        <p>${newElt.title2}</p>
      </div>
      <a href="/diia_U/template.html?id=${newElt._id}?category=opportunities" class="read-more">Read more</a>
    `;
    cardsWrapper.appendChild(card);
  });

  initializeSlider();
}

function initializeSlider() {
  const slider = document.querySelector(".cards-wrapper");
  const sliderItems = document.querySelectorAll(".news-card");
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");

  if (sliderItems.length === 0) return;

  let cardWidth =
    sliderItems[0].offsetWidth +
    parseInt(getComputedStyle(sliderItems[0]).marginRight);

  let currentIndex = 0;
  let scrollAmount = 0;

  function updateSliderPosition() {
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(-${scrollAmount}px)`;
  }

  nextButton.addEventListener("click", function () {
    if (currentIndex < sliderItems.length - 1) {
      currentIndex++;
      scrollAmount += cardWidth;
      updateSliderPosition();
    }
  });

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      scrollAmount -= cardWidth;
      updateSliderPosition();
    }
  });

  // Add touch event listeners for swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left
      nextButton.click();
    }
    if (touchEndX > touchStartX) {
      // Swipe right
      prevButton.click();
    }
  }

  // Ensure buttons and swipe work only when cards overflow
  const containerWidth = slider.offsetWidth;
  const totalWidth = cardWidth * sliderItems.length;
  const canSlide = totalWidth > containerWidth;
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
