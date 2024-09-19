const url = "https://nitjfinal.onrender.com";
function getIdFromUrl() {
  const url = window.location.href;
  const fixedUrl = url.replace("?category=", "&category=");
  const urlParams = new URL(fixedUrl);
  const searchParams = new URLSearchParams(urlParams.search);
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  console.log(id);
  console.log(category);
  return { id, category };
}

async function fetchNewsData() {
  try {
    const obj = getIdFromUrl();
    const response = await fetch(`${url}/api/diia/${obj.category}`);
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

// Rendering News-section and Opportunities page
function renderTemplate(newsItem) {
  if (!newsItem) {
    console.error("No news item found");
    return;
  }

  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage = `url(${newsItem.Image})`;

  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = newsItem.title1;

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = newsItem.title1;

  document.getElementById("title").textContent = newsItem.title2;

  const eventContainer = document.getElementById("event-container");

  if (newsItem.Image) {
    const bodyImage = document.createElement("img");
    bodyImage.src = newsItem.Image;
    bodyImage.alt = newsItem.title1;
    bodyImage.classList.add("body-image");
    eventContainer.appendChild(bodyImage);
  }

  const newsDescription = document.createElement("p");
  newsDescription.textContent = newsItem.description;
  eventContainer.appendChild(newsDescription);
}

// Rendering Mous page
function renderMOUsCategory(mou) {
  // Set the page heading and title
  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage = `url(${mou.Image})`;
  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = "Memorandum of Understanding";

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = "Memorandum of Understanding";

  document.getElementById("title").textContent = "MoU";

  // Create the MoU card
  const contentContainer = document.getElementById("event-container");
  contentContainer.innerHTML = ""; // Clear previous content

  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "overflow-hidden",
    "p-6",
    "text-center",
    "space-y-6",
    "max-w-2xl",
    "mx-auto"
  );

  // MoU Image
  const mouImage = document.createElement("img");
  mouImage.src = mou.Image || "default-image-url.jpg"; // Default image if none provided
  mouImage.alt = mou.name;
  mouImage.classList.add("w-full", "h-60", "object-cover", "rounded-lg");

  // MoU Title
  const mouTitle = document.createElement("h2");
  mouTitle.textContent = mou.name;
  mouTitle.classList.add("text-2xl", "font-semibold", "text-gray-800");

  // MoU Description
  const mouDescription = document.createElement("p");
  mouDescription.textContent = mou.description;
  mouDescription.classList.add("text-gray-700", "text-md");

  // MoU Dates
  const mouDates = document.createElement("p");
  const startDate = new Date(mou.startingDate).toLocaleDateString();
  const endDate = new Date(mou.endingDate).toLocaleDateString();
  mouDates.textContent = `Start Date: ${startDate} | End Date: ${endDate}`;
  mouDates.classList.add("text-sm", "text-gray-500");

  // Append elements to card
  card.appendChild(mouImage);
  card.appendChild(mouTitle);
  card.appendChild(mouDescription);
  card.appendChild(mouDates);

  // Append card to the content container
  contentContainer.appendChild(card);
}

// Rendering Testimonial Page
function renderTestimonialCategory(testimonial) {
  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage =
    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_makJb8WPWelSmJLYvWGWj4a8h3FwMQhKA&s)";

  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = "Testimonial";

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = "Testimonials";

  document.getElementById("title").textContent = "Testimonial";
  const contentContainer = document.getElementById("event-container");
  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "shadow-lg",
    "rounded-lg",
    "overflow-hidden",
    "p-6",
    "text-center",
    "space-y-4",
    "max-w-xl",
    "mx-auto"
  );

  const headerSection = document.createElement("div");
  headerSection.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "space-x-4"
  );

  const userImage = document.createElement("img");
  userImage.src = "https://v1.nitj.ac.in/ecell/assets/img/knm_slshow/one.jpg";
  userImage.alt = testimonial.name;
  userImage.classList.add("w-20", "h-20", "rounded-full", "object-cover");

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("text-left");

  const userName = document.createElement("h3");
  userName.textContent = testimonial.name;
  userName.classList.add("text-xl", "font-semibold", "text-gray-800");

  const userRole = document.createElement("p");
  userRole.textContent = `${testimonial.degree}, ${testimonial.dept}, ${testimonial.batch}`;
  userRole.classList.add("text-sm", "text-gray-600");

  infoContainer.appendChild(userName);
  infoContainer.appendChild(userRole);

  headerSection.appendChild(userImage);
  headerSection.appendChild(infoContainer);

  const quoteSection = document.createElement("blockquote");
  quoteSection.classList.add("text-gray-700", "text-md", "italic");

  const quote = document.createElement("p");
  quote.textContent = testimonial.description;

  quoteSection.appendChild(quote);

  const countryInfo = document.createElement("p");
  countryInfo.textContent = testimonial.country;
  countryInfo.classList.add("text-sm", "text-gray-500");

  card.appendChild(headerSection);
  card.appendChild(quoteSection);
  card.appendChild(countryInfo);

  contentContainer.appendChild(card);
}

async function initPage() {
  const obj = getIdFromUrl();
  const newsData = await fetchNewsData();
  const newsItem = newsData.find((item) => item._id === obj.id);

  if (obj.category === "news-section" || obj.category === "opportunities") {
    renderTemplate(newsItem);
  } else if (obj.category === "mous") {
    console.log(newsItem);
    renderMOUsCategory(newsItem);
  } else if (obj.category === "testimonials") {
    console.log(newsItem);
    renderTestimonialCategory(newsItem);
  }
}

document.addEventListener("DOMContentLoaded", initPage);
