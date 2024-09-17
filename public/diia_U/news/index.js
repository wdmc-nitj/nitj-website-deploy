let opportunities = [];
const url = "https://nitjfinal.onrender.com";

async function fetchData() {
  try {
    const response = await fetch(`${url}/api/diia/news-section`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    opportunities = await response.json();
    console.log("Fetched Data:", opportunities);
    renderCards();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function renderCards() {
  const cardsWrapper = document.querySelector(".cards-wrapper");
  cardsWrapper.innerHTML = "";

  opportunities.forEach((opportunity) => {
    const card = document.createElement("div");
    card.classList.add("news-card");

    card.innerHTML = `
      <img src="${opportunity.Image}" alt="News Image" />
      <div class="text-area">
        <span class="date">${new Date(
          opportunity.createdAt
        ).toLocaleDateString()}</span>
        <h2 class="heading">${opportunity.title1}</h2>
        <p>${opportunity.title2}</p>
        <a href="${url}/diia_U/template.html?id=${
      opportunity._id
    }?category=news-section" class="read-more">Read more</a>
      </div>
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

  const firstCardClone = sliderItems[0].cloneNode(true);
  const lastCardClone = sliderItems[sliderItems.length - 1].cloneNode(true);

  slider.appendChild(firstCardClone);
  slider.insertBefore(lastCardClone, sliderItems[0]);

  let currentIndex = 1;
  let scrollAmount = cardWidth;

  slider.style.transform = `translateX(-${scrollAmount}px)`;

  function updateSliderPosition() {
    slider.style.transition = "transform 0.4s ease-in-out";
    slider.style.transform = `translateX(-${scrollAmount}px)`;
  }

  nextButton.addEventListener("click", function () {
    currentIndex++;
    scrollAmount += cardWidth;

    updateSliderPosition();

    if (currentIndex >= sliderItems.length) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = 1;
        scrollAmount = cardWidth;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
      }, 400);
    }
  });

  prevButton.addEventListener("click", function () {
    currentIndex--;
    scrollAmount -= cardWidth;

    updateSliderPosition();

    if (currentIndex <= 0) {
      setTimeout(() => {
        slider.style.transition = "none";
        currentIndex = sliderItems.length - 1;
        scrollAmount = cardWidth * currentIndex;
        slider.style.transform = `translateX(-${scrollAmount}px)`;
      }, 400);
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
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
