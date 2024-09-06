// Fetch and display the header images
// async function fetchHeaderImages() {
//   try {
//     const response = await fetch(
//       "https://your-backend-endpoint.com/api/header-images"
//     ); // Replace with your backend URL
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const images = await response.json();
//     initHeader(images);
//   } catch (error) {
//     console.error("Failed to fetch header images:", error);
//   }
// }

const images = [
  {
    url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page1",
  },
  {
    url: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page2",
  },
  {
    url: "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page3",
  },
  {
    url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "https://example.com/page4",
  },
];

// Initialize the header background image change
function initHeader(images) {
  const headerImageContainer = document.getElementById("headerImageContainer");
  let currentIndex = 0;

  function updateHeaderImage() {
    headerImageContainer.style.backgroundImage = `url(${images[currentIndex].url})`;
    currentIndex = (currentIndex + 1) % images.length;
  }

  updateHeaderImage();
  setInterval(updateHeaderImage, 5000); // Change image every 5 seconds
}

// Fetch and display news
// async function fetchNews() {
//   try {
//     const response = await fetch(
//       "https://your-backend-endpoint.com/api/news"
//     ); // Replace with your backend URL
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const newsItem = await response.json();
//     document.getElementById("newsHeading").textContent = newsItem.heading;
//     document.getElementById("newsImage").src = newsItem.image;
//     document.getElementById("newsDescription").textContent = newsItem.description;
//   } catch (error) {
//     console.error("Failed to fetch news:", error);
//   }
// }

// Initialize the page
initHeader(images);
// fetchNews();

// for navigation Headers

const currentLink = document.getElementById("page-heading");
currentLink.textContent = "Janmashtami";
currentLink.href = window.location.href;
