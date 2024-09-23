const url = "https://nitjfinal.onrender.com"; // Base URL

async function fetchFooterData() {
    try {
        const response = await fetch(`${url}/api/diia/footer`);
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

function renderFooter(data) {
    const quickLinks = document.getElementById('quick-links');
    const footerData = data[0]; 

    // Render quick links dynamically
    quickLinks.innerHTML = footerData.QuickLinkName.map((name, index) =>
        `<li><a href="${footerData.QuickLink[index]}">${name}</a></li>`
    ).join('');
}

window.onload = function () {
    fetchFooterData();
};
