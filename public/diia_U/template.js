// Function to get the ID from the URL parameters
function getIdFromUrl() {
  // Get the current URL

  const url = window.location.href;
  const fixedUrl = url.replace("?category=", "&category=");
  const urlParams = new URL(fixedUrl);
  const searchParams = new URLSearchParams(urlParams.search);
  const id = searchParams.get("id");
  const category = searchParams.get("category");

  console.log("ID:", id);
  console.log("Category:", category);

  return { id, category };
}

// Fetch all news data from the API
async function fetchNewsData() {
  try {
    const response = await fetch(
      "https://nitjfinal.onrender.com/api/diia/news-section"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch news data");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return [];
  }
}

// Function to render the template with the specific news data
function renderTemplate(newsItem) {
  if (!newsItem) {
    console.error("No news item found");
    return;
  }

  // Set the header image
  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage = `url(${newsItem.Image})`;

  // Set the page heading
  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = newsItem.title1;

  // Set the header heading text
  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = newsItem.title2;

  // Set the news title
  document.getElementById("title").textContent = newsItem.title1;

  // Create an image and description element for the body section
  const eventContainer = document.getElementById("event-container");

  // Add the image first
  if (newsItem.Image) {
    const bodyImage = document.createElement("img");
    bodyImage.src = newsItem.Image;
    bodyImage.alt = newsItem.title1;
    bodyImage.classList.add("body-image");
    eventContainer.appendChild(bodyImage);
  }

  // Add the description after the image
  const newsDescription = document.createElement("p");
  newsDescription.textContent = newsItem.description;
  eventContainer.appendChild(newsDescription);
}

// Main function to initialize the page
async function initPage() {
  const obj = getIdFromUrl(); // Get the ID from the URL
  const newsData = await fetchNewsData(); // Fetch all news data
  const newsItem = newsData.find((item) => item._id === obj.id); // Find the specific news item by ID
  renderTemplate(newsItem); // Render the template with the found news item
}

// Initialize the page when the DOM is ready
document.addEventListener("DOMContentLoaded", initPage);
