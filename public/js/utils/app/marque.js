export default function fetchData() {
  fetch("/api/initiative")
    .then((res) => res.json())
    .then((data) => {
      // sort the data for marquee
      const sortData = data
        .filter((item) => item.marquee && item.mshow)
        .sort((a, b) => a.order - b.order);

      const marqueElement = document.getElementById("marquee-div");
      marqueElement.innerHTML = "";
      const newMarqueElementHTML = sortData
        ?.map(
          (item, index) => `
                  <div class="flex items-center gap-1">
                  <span class="w-2 h-2 mt-1 rounded-full bg-accent"></span>
                  <h3 class="text-lg">${item?.title1}</h3>
                  </div>
  `
        )
        .join(""); // Join the array of HTML strings into a single string

      if (!sortData || sortData.length === 0) {
        const marqueeParentDiv = document.getElementById("marquee-parent-div");
        marqueeParentDiv.style.display = "none";
      } else {
        marqueElement.innerHTML = newMarqueElementHTML;
      }
    });
}

fetchData();
