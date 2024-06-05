document.addEventListener("DOMContentLoaded", function() {
    const images = ['/images/backimg1.jpg', '/images/backimg2.jpg' , '/images/backimg3.jpg']; // Add more image paths as needed
    let index = 0;
  
    const frontPageHeading = document.getElementById('front-page-heading');
    const frontPageText = document.getElementById('front-page-text');
  
    setInterval(() => {
        document.querySelector('.front-page').style.backgroundImage = `url(${images[index]})`;
        index = (index + 1) % images.length;
        
    }, 5000);
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const toggleButtons = document.querySelectorAll(".toggle-answer");
  
    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            const answer = this.previousElementSibling;
            answer.style.display = answer.style.display === "none" ? "block" : "none";
            this.textContent = this.textContent === "+" ? "-" : "+";
        });
    });
  });
  
  
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  
  
  function openNewPage() {
    window.open("views/index.js", "_self");
  }
  function toggleMenu() {
    var navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
  }
  
  //for active home and about*****************
  // Get the "Home" and "About" links
  const homeLink = document.querySelector(".nav-links li:nth-child(2) a");
  const aboutLink = document.querySelector(".nav-links li:nth-child(3) a");
  
  // Add click event listener to the "Home" link
  homeLink.addEventListener("click", function (event) {
    // Prevent default behavior of link
    event.preventDefault();
  
    // Remove 'active-link' class from all links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active-link");
    });
  
    // Add 'active-link' class to the "Home" link
    this.classList.add("active-link");
  });
  
  // Add click event listener to the "About" link
  aboutLink.addEventListener("click", function (event) {
    // Prevent default behavior of link
    event.preventDefault();
  
    // Remove 'active-link' class from all links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active-link");
    });
  
    // Add 'active-link' class to the "About" link
    this.classList.add("active-link");
  });
  