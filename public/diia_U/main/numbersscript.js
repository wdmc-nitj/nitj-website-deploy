
// Animate a number from start to end over a specified duration
function animateNumber(id, start, end, duration) {
    const obj = document.getElementById(id); // Use const for the element by ID
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
        current += increment;
        obj.textContent = current + '+'; // Update the element's text content
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Parallax effect
function applyParallaxEffect() {
    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.numbers-section').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}




async function fetchData() {
    try {
        const response = await fetch("/api/diia/numbers"); // Use const url for the fetch
        const data = await response.json();
        renderNumbers(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderNumbers(data) {
    const numbersSection = document.querySelector('.numbers-section');
    numbersSection.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        const numberItem = document.createElement('div');
        numberItem.classList.add('number-item');
        
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
