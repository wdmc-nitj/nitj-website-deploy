// for navigation Headers

const currentLink = document.getElementById("page-heading");
currentLink.textContent = "Latest News";
currentLink.href = window.location.href;

// To render latest news
// Sample data structure
const data = [
  { heading: "First Link", url: "https://example.com/first" },
  { heading: "Second Link", url: "https://example.com/second" },
  { heading: "Third Link", url: "https://example.com/third" },
];

// Function to dynamically add items to the list
function populateList() {
  const list = document.getElementById("list");

  // Clear any existing content
  list.innerHTML = "";

  // Loop through each item in the data array
  data.forEach((item) => {
    // Create a new <li> element
    const listItem = document.createElement("li");

    // Create a new <a> element for the hyperlink
    const link = document.createElement("a");
    link.className =
      "underline underline-offset-4 decoration-accent decoration-0 hover:decoration-2";
    link.href = item.url;
    link.textContent = item.heading;

    // Create the new-tag div structure
    const newTagDiv = document.createElement("div");
    newTagDiv.className =
      "inline-flex ml-2 items-center justify-start space-x-2";

    const iconSpan = document.createElement("span");
    iconSpan.className = "material-symbols-outlined text-accent-orange";

    const svgIcon = `
            <svg fill="#ff9905" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
            </svg>
        `;

    iconSpan.innerHTML = svgIcon;

    const newText = document.createElement("p");
    newText.className = "text-lg font-bold uppercase text-[#ff9905]";
    newText.textContent = "New";

    // Append the icon and text to the newTagDiv
    newTagDiv.appendChild(iconSpan);
    newTagDiv.appendChild(newText);

    // Append the link and new-tag div to the list item
    listItem.appendChild(link);
    listItem.appendChild(newTagDiv);

    // Append the list item to the main list
    list.appendChild(listItem);
  });
}

// Call the function to populate the list
populateList();
