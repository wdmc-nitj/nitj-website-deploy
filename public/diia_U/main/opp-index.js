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
    card.classList.add(
      "news-card",
      "flex",
      "flex-col",
      "rounded-xl",
      "bg-light-purple",
      "shadow-xl",
      "border-t-4",
      "border-b-4",
      "border-accent",
      "h-[27rem]",
      // "w-60",
      "m-auto"
    );

    card.innerHTML = `
      <div style='aspect-ratio:4/5' class="flex flex-col h-full w-full p-2.5">
        <div style="background-image:url(${newElt.Image}); box-sizing:border-box; height:60%; background-size:cover" class="card-Image rounded-lg"></div>
        <div style="box-sizing: border-box; height:40%;" class="text-area flex flex-col flex-grow p-4">
          <h2 class="heading mt-5 text-lg line-clamp-3 font-semibold text-gray-900 w-full" style='text-align:justify'>${
            newElt.title1
            // .substring(0,45)+'...'
            +'...'
          }</h2>
          <div class="pt-5 mt-auto">
            <a href=${newElt.show ?('/diia_U/template.html?id='+newElt._id+'?category=opportunities'):('/404.html') } 
              class="read-more cursor-pointer font-medium text-sky-500 hover:text-sky-600" target="_blank">Read more →</a>
          </div>
        </div>
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
