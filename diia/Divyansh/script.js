// Content for the number section 
const numberItems = [
    { id: 'mous', number: 30, text: 'MoUs', icon: 'fas fa-graduation-cap' },
    { id: 'international-projects', number: 120, text: 'International Projects', icon: 'fas fa-graduation-cap' },
    { id: 'international-collaborations', number: 100, text: 'International Collaborations', icon: 'fas fa-graduation-cap' }
];


function createNumberSection() {
    const numbersSection = document.getElementById('numbers-section');

    numberItems.forEach(item => {
        const numberItem = document.createElement('div');
        numberItem.className = 'number-item';
        
        const p = document.createElement('p');
        p.id = item.id;
        p.innerText = '0+';
        numberItem.appendChild(p);

        const h2 = document.createElement('h2');
        h2.innerText = item.text;
        numberItem.appendChild(h2);

        const icon = document.createElement('i');
        icon.className = item.icon + ' icon';
        numberItem.appendChild(icon);

        numbersSection.appendChild(numberItem);
    });
}


function animateNumber(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current + '+';
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}


window.onload = function() {
    createNumberSection();

    animateNumber('mous', 0, 30, 2000);
    animateNumber('international-projects', 0, 120, 2000);
    animateNumber('international-collaborations', 0, 100, 2000);

    // Parallax effect
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;
        document.querySelector('.numbers-section').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
};
