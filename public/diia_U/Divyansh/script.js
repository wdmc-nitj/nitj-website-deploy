function animateNumber(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
        current += increment;
        obj.textContent = current + '+';
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

window.onload = function () {
    animateNumber('mous', 0, 30, 2000);
    animateNumber('international-projects', 0, 120, 2000);
    animateNumber('international-collaborations', 0, 100, 2000);

    // Parallax effect
    window.addEventListener('scroll', function () {
        let scrollPosition = window.pageYOffset;
        document.querySelector('.numbers-section').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
};
