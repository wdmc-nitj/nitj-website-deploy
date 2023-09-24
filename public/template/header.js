import getNavbar from '../js/navbar.js'
const bodyEl = document.body

window.addEventListener('load', () => {
  handlingPDFs()
  navbarUtil()
  setFavicon('/public/assets/images/nitj-logo.png')
})
window.addEventListener('scroll', () => {
  navbarUtil()
})
function handlingPDFs() {
  const linksToPDFs = document.querySelectorAll(
    'a[href*="pdf"], a[href^="https"]'
  )

  linksToPDFs.forEach((link) => {
    link.setAttribute('target', '_blank')
  })
}

function setFavicon(iconPath) {
  const newFavIcon = document.createElement('link')
  newFavIcon.rel = 'icon'
  newFavIcon.type = 'image/x-icon'
  newFavIcon.href = iconPath
  document.head.appendChild(newFavIcon)
}

fetch('/template/navbar.html')
  .then((res) => res.text())
  .then((html) => {
    const navEl = document.createElement('header')
    navEl.innerHTML = html
    bodyEl.prepend(navEl)
    carousel()
    getNavbar()
    handlingPDFs()
    const scrollToTopButton = document.querySelector('#scroll-to-top-button')

    const checkScrollPos = () => {
      if (window.scrollY > 20) {
        scrollToTopButton.style.display = 'block'
      } else {
        scrollToTopButton.style.display = 'none'
      }
    }
    const backToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }

    scrollToTopButton.addEventListener('click', backToTop)
    window.addEventListener('scroll', checkScrollPos)
    // scroll to top functions
  })

let slideIndex = 0

function carousel() {
  const slides = document.querySelectorAll('.mySlides')

  slides.forEach((slide) => {
    slide.style.transition = 'opacity 0.5s' // Adjust the transition duration as needed
    slide.style.opacity = 0
  })

  // Update the slide index and display the next slide
  slideIndex = (slideIndex + 1) % slides.length
  slides[slideIndex].style.opacity = 1

  // Automatically advance the carousel
  setTimeout(carousel, 2500)
}
function navbarUtil() {
  const institute_name = document.getElementsByClassName('institute_name')
  const logo = document.getElementById('logo_250')
  const topbar = document.getElementById('top_bar')
  const diff_lang = document.getElementsByClassName('mySlides')

  if (window.scrollY > 100) {
    topbar.style.transform = 'translateY(-50px)'
    for (let i = 0; i < diff_lang.length; i++) {
      diff_lang[i].classList.remove('mt-7')
    }
    for (let i = 0; i < institute_name.length; i++) {
      if (window.innerWidth > 620) {
        logo.style.width = '90px'
        logo.style.height = '90px'
      }
      logo.classList.remove('sm:translate-y-0', 'top-1')
      logo.classList.add('sm:top-0')
      if (institute_name[i].classList.contains('sm:text-xl')) {
        institute_name[i].classList.remove('sm:text-xl')
        institute_name[i].classList.add('sm:text-lg')
        institute_name[i].classList.add('tracking-widest')
      } else if (institute_name[i].classList.contains('sm:text-lg')) {
        institute_name[i].classList.remove('sm:text-lg')
        institute_name[i].classList.add('sm:text-sm')
        institute_name[i].classList.remove('tracking-widest')
      }
    }
  } else {
    logo.style.width = '120px'
    logo.style.height = '120px'
    topbar.style.transform = 'translateY(0)'
    for (let i = 0; i < diff_lang.length; i++) {
      diff_lang[i].classList.add('mt-7')
    }
    logo.classList.remove('sm:top-0')
    logo.classList.add('sm:translate-y-0', 'top-1')
    for (var i = 0; i < institute_name.length; i++) {
      if (institute_name[i].classList.contains('sm:text-lg')) {
        institute_name[i].classList.remove('sm:text-lg')
        institute_name[i].classList.add('sm:text-xl')
        institute_name[i].classList.remove('tracking-widest')
      } else if (institute_name[i].classList.contains('sm:text-sm')) {
        institute_name[i].classList.remove('sm:text-sm')
        institute_name[i].classList.add('sm:text-lg')
        institute_name[i].classList.remove('tracking-widest')
      } else if (institute_name[i].classList.contains('sm:text-lg')) {
      }
    }
  }
}
