let data = [];
const url = "https://nitjfinal.onrender.com";

async function fetchData() {
  try {
    const response = await fetch(`/api/diia/testimonials`);
    if (!response.ok) {
      console.log(response);
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    data = await response.json();
    console.log(data);

    // Sort data alphabetically by name
    data.sort((a, b) => a.name.localeCompare(b.name));

    // Display the static background image and heading
    displayStaticBackground();

    // Populate the sorted list of testimonials
    populateList(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function displayStaticBackground() {
  const imageContainer = document.getElementById("imageContainer");
  const heading = document.getElementById("heading");

  if (!imageContainer || !heading) {
    console.error("Required elements not found");
    return;
  }

  // Set a static background image and heading
  imageContainer.style.backgroundImage = "url('./assets/flags.jpg')";
  imageContainer.style.backgroundSize = "cover";
  imageContainer.style.backgroundPosition = "center";
  heading.textContent = "Testimonials";
}

function populateList(data) {
  const list = document.getElementById("list");

  if (!list) {
    console.error("List element not found");
    return;
  }

  list.innerHTML = "";

  data.forEach((item) => {
    const listItem = document.createElement("li");

    // Create link element with the testimonial title
    const link = document.createElement("a");
    link.className =
      "underline underline-offset-4 decoration-accent decoration-0 hover:decoration-2 text-lg";
    link.href = `/diia_U/template.html?id=${item._id}&category=testimonials`;
    link.textContent = `${item.name}, ${item.country}`;

    // Add 'New' tag for recent testimonials
    const newTagDiv = document.createElement("div");
    newTagDiv.className =
      "inline-flex ml-2 items-center justify-start space-x-2";

    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-accent-orange";
    iconSpan.innerHTML = `
      <svg fill="#ff9905" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
      </svg>
    `;

    const newText = document.createElement("p");
    newText.className = "text-lg font-bold uppercase text-[#ff9905]";
    newText.textContent = "New";

    newTagDiv.appendChild(iconSpan);
    newTagDiv.appendChild(newText);

    listItem.appendChild(link);
    listItem.appendChild(newTagDiv);
    list.appendChild(listItem);
  });
}

// Call fetchData on page load
fetchData();
