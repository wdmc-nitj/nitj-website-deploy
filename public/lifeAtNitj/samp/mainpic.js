function initializeSlider() {
  const slides = document.querySelectorAll('.background-slider .slide');
  let currentSlide = 0;
  let previousSlide = slides.length - 1;

  function nextSlide() {
    // Remove previous class from old previous slide
    slides[previousSlide].classList.remove('previous');
    
    // Add previous class to current slide
    slides[currentSlide].classList.remove('active');
    slides[currentSlide].classList.add('previous');
    
    // Update previous slide index
    previousSlide = currentSlide;
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  // Set initial state
  slides[currentSlide].classList.add('active');

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Add this to your existing script or window.onload
document.addEventListener('DOMContentLoaded', initializeSlider);




let scrollPosition = 0;
        let autoScroll = true;
        const announcementsContent = document.getElementById('announcementsContent');

        function scrollAnnouncements() {
            if (!autoScroll) return;
            
            scrollPosition = (scrollPosition + 1) % 3;
            announcementsContent.style.transform = `translateY(-${scrollPosition * 33.33}%)`;
        }

        setInterval(scrollAnnouncements, 3000);

        // Pause auto-scroll on hover
        announcementsContent.addEventListener('mouseenter', () => {
            autoScroll = false;
        });

        announcementsContent.addEventListener('mouseleave', () => {
            autoScroll = true;
        });

        // Branches horizontal scroll
        function scrollBranches(direction) {
            const container = document.getElementById('branchesScroll');
            const scrollAmount = 300;
            
            if (direction === 'left') {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        // Clone branch cards for infinite scroll effect
        const branchesScroll = document.getElementById('branchesScroll');
        const branchCards = document.querySelectorAll('.branch-card');
        
        branchCards.forEach(card => {
            const clone = card.cloneNode(true);
            branchesScroll.appendChild(clone);
        });