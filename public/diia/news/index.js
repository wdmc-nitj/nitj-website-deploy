document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.cards-wrapper');
    const sliderItems = document.querySelectorAll('.news-card');
    const prevButton = document.querySelector('.arrow-left');
    const nextButton = document.querySelector('.arrow-right');

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