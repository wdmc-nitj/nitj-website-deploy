import './utils/app/imgSlider.js'
import './utils/app/sliderTextAnimation.js'
import navbarUtil from './utils/app/navUtils.js'
import {
  backToTop,
  checkScrollPos,
  newsCardsScroll,
  publicationCardsScroll,
  clubsCardsScroll,
} from './utils/app/scrollUtils.js'
import './utils/app/tabUits.js'

window.onscroll = navbarUtil
// window.onload = getNavbar
function openDropdown() {
  var dropdown = document.getElementById('dropdown')
  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden')
  } else {
    dropdown.classList.add('hidden')
  }
}

// Slide Cards on Scroll
function slideCards(e, direction) {
  // var container = document.getElementById('cards')
  const container = e.parentNode.querySelector('div')
  scrollCompleted = 0
  var slideVar = setInterval(function () {
    if (direction == 'left') {
      container.scrollLeft -= container.clientWidth
    } else {
      container.scrollLeft += container.clientWidth
    }
    scrollCompleted += 100
    if (scrollCompleted >= 1000) {
      window.clearInterval(slideVar)
    }
  }, 2)
}

function showSearchPage(event) {
  if (event.target.id == 'search_form') {
    return
  }
  var search_page = document.getElementById('search_page')
  if (search_page.classList.contains('hidden')) {
    search_page.classList.remove('hidden')
    search_page.classList.add('grid')
  } else {
    search_page.classList.remove('grid')
    search_page.classList.add('hidden')
  }
}

// ///////////////////////////
// Image Slider Animation::

// News Cards Auto Scroll

setTimeout(newsCardsScroll, 1000)

// Publication Cards Auto Scroll

setTimeout(publicationCardsScroll, 1000)

// Clubs Cards Auto Scroll

setTimeout(clubsCardsScroll, 1000)

// Scroll to top Button

const scrollToTopButton = document.querySelector('#scroll-to-top-button')

scrollToTopButton.addEventListener('click', backToTop)

window.addEventListener('scroll', checkScrollPos)
