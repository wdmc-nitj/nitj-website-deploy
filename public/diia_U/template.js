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
    const response = await fetch(`/api/diia/${obj.category}`);
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
  headerImageContainer.style.backgroundImage = `url('./assets/flag.jpg')`;

  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = newsItem.title2;

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = newsItem.title2;

  document.getElementById("title").textContent = newsItem.title1;

  const eventContainer = document.getElementById("event-container");

  if (newsItem.Image) {
    const bodyImage = document.createElement("img");
    bodyImage.src = newsItem.Image;
    bodyImage.alt = newsItem.title2;
    bodyImage.classList.add("body-image");
    eventContainer.appendChild(bodyImage);
  }

  const newsDescription = document.createElement("p");
  newsDescription.classList.add("text-justify");
  newsDescription.textContent = newsItem.description;
  eventContainer.appendChild(newsDescription);
}

// Rendering Mous page
function renderMOUsCategory(mou) {
  // Set the page heading and title
  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage = "url('./assets/flag.jpg')";
  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = "Memorandum of Understanding";

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = "Memorandum of Understanding";

  document.getElementById("title").textContent = mou.name;

  // Create the MoU card container
  const contentContainer = document.getElementById("event-container");
  contentContainer.innerHTML = ""; // Clear previous content

  // Main card container with increased size
  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "shadow-lg", // Regular shadow
    "rounded-lg",
    "overflow-hidden",
    "p-6",
    "space-y-4",
    "max-w-[3xl]", // Increased width of the card
    "border-b-4", // Border shifted to bottom
    "border-[#0369a0]",
    // Align to the left with minimal margin
    "m-auto" // Margin from the top
  );

  // MoU Image with increased size
  const mouImage = document.createElement("img");
  mouImage.src = mou.Image || "default-image-url.jpg"; // Default image if none provided
  mouImage.alt = mou.name;
  mouImage.classList.add(
    "w-full",
    "h-112", // Increased image height
    "object-cover",
    "rounded-lg",
    "shadow-md"
  );

  // MoU Title with increased size
  const mouTitle = document.createElement("h2");
  mouTitle.textContent = mou.name;
  mouTitle.classList.add("text-3xl", "font-semibold", "text-gray-800");

  // MoU Dates
  const mouDates = document.createElement("p");
  const startDate = new Date(mou.startingDate).toLocaleDateString();
  const endDate = new Date(mou.endingDate).toLocaleDateString();
  mouDates.textContent = `Start Date: ${startDate} | End Date: ${endDate}`;
  mouDates.classList.add("text-lg", "font-medium", "text-[#0369a0]");

  card.appendChild(mouImage);
  card.appendChild(mouTitle);
  card.appendChild(mouDates);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("text-left", "mt-8", "ml-4", "pr-4");

  const mouDescription = document.createElement("p");
  mouDescription.textContent = mou.description;
  mouDescription.classList.add(
    "leading-relaxed",
    "text-xl",
    "text-black",
    "overflow-visible",
    "whitespace-normal",
    "text-justify"
  );

  descriptionContainer.appendChild(mouDescription);

  contentContainer.appendChild(card);
  contentContainer.appendChild(descriptionContainer);
}

function renderTestimonialCategory(testimonial) {
  const headerImageContainer = document.getElementById("headerImageContainer");
  headerImageContainer.style.backgroundImage = `url('./assets/flag.jpg')`;
  headerImageContainer.style.display = "flex";
  headerImageContainer.style.justifyContent = "center";
  headerImageContainer.style.alignItems = "center";

  const pageHeading = document.getElementById("page-heading");
  pageHeading.textContent = "Testimonial";

  const headerHeading = document.getElementById("headerHeading");
  headerHeading.textContent = "Testimonials";

  document.getElementById("title").textContent = "Testimonial";

  const contentContainer = document.getElementById("event-container");
  contentContainer.style.padding = "20px";

  const card = document.createElement("div");
  card.classList.add(
    "bg-white",
    "shadow-xl",
    "rounded-lg",
    "overflow-hidden",
    "p-6",
    "text-center",
    "space-y-6",
    "max-w-3xl",
    "mx-auto"
  );
  card.style.maxWidth = "90vw";
  card.style.margin = "40px auto";
  card.style.border = "1px solid #ddd";
  card.style.borderRadius = "15px";
  card.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
  card.style.backgroundColor = "#f9f9f9";

  const headerSection = document.createElement("div");
  headerSection.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "space-x-6"
  );
  headerSection.style.marginBottom = "20px";

  const userImage = document.createElement("img");
  userImage.src = "https://v1.nitj.ac.in/ecell/assets/img/knm_slshow/one.jpg";
  userImage.alt = testimonial.name;
  userImage.classList.add("rounded-full", "object-cover");
  userImage.style.width = "150px";
  userImage.style.height = "150px";
  userImage.style.borderRadius = "50%";
  userImage.style.border = "5px solid #3498db";
  userImage.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.4)";
  userImage.style.objectFit = "cover";

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("text-left");

  const userName = document.createElement("h3");
  userName.textContent = testimonial.name;
  userName.classList.add("text-2xl", "font-bold", "text-gray-800");
  userName.style.marginBottom = "5px";
  userName.style.fontSize = "28px";
  const userRole = document.createElement("p");
  userRole.textContent = `${testimonial.degree}, ${testimonial.dept}, ${testimonial.batch}, Bangladesh`; // Added "Bangladesh"
  userRole.classList.add("text-md", "text-gray-700");
  userRole.style.fontSize = "18px";
  userRole.style.color = "#555";
  infoContainer.appendChild(userName);
  infoContainer.appendChild(userRole);

  headerSection.appendChild(userImage);
  headerSection.appendChild(infoContainer);

  const quoteSection = document.createElement("blockquote");
  quoteSection.classList.add("text-gray-700", "text-lg");
  quoteSection.style.fontSize = "20px";
  quoteSection.style.color = "#333";
  quoteSection.style.padding = "20px 30px";
  quoteSection.style.borderLeft = "5px solid #3498db";
  quoteSection.style.backgroundColor = "#fff";
  quoteSection.style.borderRadius = "5px";

  const quote = document.createElement("p");
  quote.textContent = testimonial.description;
  quote.classList.add("italic", "text-justify");

  quoteSection.appendChild(quote);

  const countryInfo = document.createElement("p");
  countryInfo.textContent = testimonial.country;
  countryInfo.classList.add("text-sm", "text-[#3498db]");
  countryInfo.style.fontSize = "16px";
  countryInfo.style.color = "#3498db";
  countryInfo.style.marginTop = "10px";

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
