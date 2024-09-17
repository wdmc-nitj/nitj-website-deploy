// Fetch footer data from the backend
async function fetchFooterData() {
    try {
        const response = await fetch('https://nitjfinal.onrender.com/api/diia/footer'); // Replace with your API endpoint
        const data = await response.json();
        if (data && data.length > 0) {
            renderFooter(data);
        } else {
            console.error('No footer data found');
        }
    } catch (error) {
        console.error('Error fetching footer data:', error);
    }
}

// Render footer content dynamically
function renderFooter(data) {
    const footerContainer = document.querySelector('.footer-container');

    // Assuming that you might receive an array, so we should process the first item.
    const footerData = data[0]; 

    footerContainer.innerHTML = `
        <div class="footer-left">
            <h4>Quick Links</h4>
            <ul>
                ${footerData.QuickLinkName.map((name, index) => `<li><a href="${footerData.QuickLink[index]}">${name}</a></li>`).join('')}
            </ul>
        </div>

        <div class="footer-right">
            <div class="footer-header">
                <div class="footer-logo">
                    <img src="https://www.nitj.ac.in/public/assets/images/logo_250.png" alt="Institute Logo">
                </div>
                <div class="footer-details">
                    <h2>Dr B R Ambedkar National Institute of Technology Jalandhar</h2>
                </div>
            </div>
            <div class="footer-contact">
                <p>
                    <i class="fas fa-map-marker-alt"></i>
                    G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144008
                </p>
                <p>
                    <i class="fas fa-phone-alt"></i>
                    +91-0181-5037855, 2690301, 2690453, 3082000
                </p>
            </div>
            <div class="footer-social">
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
            <div id="flagCounter">
                <a href="https://www.worldflagcounter.com/details/iLO">
                    <img src="https://www.worldflagcounter.com/iLO/" alt="Flag Counter">
                </a>
            </div>
        </div>
        
    `;
}

// Initialize everything
window.onload = function () {
    fetchFooterData(); // Fetch and render footer data
};
