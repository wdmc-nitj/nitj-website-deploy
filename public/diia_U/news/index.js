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

    let scrollAmount = 0;
    const cardWidth = sliderItems[0].offsetWidth + parseInt(getComputedStyle(sliderItems[0]).marginRight);
    const totalWidth = cardWidth * sliderItems.length;
    const visibleWidth = document.querySelector('.card-slider').clientWidth; // Width of the visible slider area

    // Set the width of the cards-wrapper
    slider.style.width = `${totalWidth}px`;

    nextButton.addEventListener('click', function () {
        scrollAmount += cardWidth;
        if (scrollAmount >= totalWidth - visibleWidth) {
            scrollAmount = 0; // Loop back to the start
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevButton.addEventListener('click', function () {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) {
            scrollAmount = totalWidth - visibleWidth; // Loop to the end
        }
        slider.style.transform = `translateX(-${scrollAmount}px)`;
    });
});