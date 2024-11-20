function showTesti(d) {
  for (let i = 0; i < d.length; i++) {
    let cont = document.querySelectorAll(".testimonial-card")[i];

    // Set the testimonial content
    cont
      .querySelectorAll(".testimonial-content")[0]
      .querySelector("p").innerHTML =
      '"' +
      d[i].description.substring(0, 250) +
      '..."' +
      cont.querySelectorAll(".testimonial-content")[0].querySelector("p")
        .innerHTML;

    // Set the footer content
    cont
      .querySelectorAll(".testimonial-footer")[0]
      .querySelectorAll("h4")[0].innerHTML = d[i].name;
    cont
      .querySelectorAll(".testimonial-footer")[0]
      .querySelectorAll("p")[0].innerHTML =
      d[i].degree + " (" + d[i].batch + ")";
    cont
      .querySelectorAll(".testimonial-footer")[0]
      .querySelectorAll("img")[0].src = d[i].Image;

    let readMoreLink = cont.querySelector(".testimonial-content a");
    readMoreLink.href = `/diia_U/template.html?id=${d[i]._id}?category=testimonials`;
  }
}

/* window.onload = async function () {
  try {
    const response = await fetch("/api/diia/testimonials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      const data = await response.json();
      if (data) showTesti(data);
    }
  } catch (e) {
    console.log(e);
  }
}; */

document.addEventListener("DOMContentLoaded",async function() {
  try {
    const response = await fetch("/api/diia/testimonials", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      const data = await response.json();
      if (data) showTesti(data);
    }
  } catch (e) {
    console.log(e);
  }
});
