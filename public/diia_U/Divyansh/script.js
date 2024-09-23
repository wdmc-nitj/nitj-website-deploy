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
    const obj = document.getElementById(id); // Use const for the element by ID
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current + '+'; // Update the element's text content
        if (current === end) {
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
}

// Fetch data and render it
const url = "https://nitjfinal.onrender.com"; // Base URL

async function fetchData() {
    try {
        const response = await fetch(`${url}/api/diia/numbers`); // Use const url for the fetch
        const data = await response.json();
        renderNumbers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render numbers dynamically and animate them
function renderNumbers(data) {
    const numbersSection = document.querySelector('.numbers-section');
    numbersSection.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        const numberItem = document.createElement('div');
        numberItem.classList.add('number-item');
        
        // Choose different icons based on the item title
        let iconClass;
        switch (item.title.toLowerCase()) {
            case 'mous':
                iconClass = 'fa-graduation-cap';
                break;
            case 'research collaborations':
                iconClass = 'fa-users';
                break;
            case 'delegate visits':
                iconClass = 'fa-briefcase';
                break;
            default:
                iconClass = 'fa-question'; // Default icon
        }

        numberItem.innerHTML = `
            <p id="${item.title.toLowerCase().replace(/\s+/g, '-')}" data-number="${item.Number}">${item.Number}</p>  
            <h2>${item.title}</h2>  
            <i class="fas ${iconClass} icon"></i>  
        `;
        numbersSection.appendChild(numberItem);
    });

    // Animate numbers after rendering
    data.forEach(item => {
        animateNumber(
            item.title.toLowerCase().replace(/\s+/g, '-'),
            0,
            parseInt(item.Number),
            2000
        );
    });
}

// Initialize everything
window.onload = function () {
    fetchData(); // Fetch data and render numbers
    applyParallaxEffect(); // Apply parallax effect
};
