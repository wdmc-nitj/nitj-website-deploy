const stringsArray = [
  'THE PLACE OF TRANSFORMATION',
  '72<sup>nd</sup> IN OVERALL NIRF RANKING',
  '46<sup>th</sup> IN ENGINEERING NIRF',
]

const mainSliderText = document.getElementById('main-slider-text')
let currentIndex = 0
let isPaused = false
let currentElementInside = null
let animationTimeout = null

function animateText() {
  if (isPaused) return
  const currentString = stringsArray[currentIndex]
  const newH2 = document.createElement('h2')
  newH2.innerHTML = currentString
  newH2.classList.add('enter-animation')

  mainSliderText.innerHTML = newH2.outerHTML

  currentElementInside = mainSliderText.childNodes[0]

  animationTimeout = setTimeout(() => {
    if (currentElementInside) {
      currentElementInside.classList.remove('enter-animation')
    }
    currentElementInside.classList.add('exit-animation')

    currentElementInside.addEventListener(
      'animationend',
      function () {
        currentElementInside.remove()

        currentIndex = (currentIndex + 1) % stringsArray.length

        animateText()
      },
      { once: true }
    )
  }, 2200)
}

animateText()

// Pause animation when hovering over mainSliderText
mainSliderText.addEventListener('mouseenter', () => {
  isPaused = true
  clearTimeout(animationTimeout)
  currentElementInside.classList.remove('exit-animation')
  console.log('stopping animation')
})

// Resume animation when the mouse leaves mainSliderText
mainSliderText.addEventListener('mouseleave', () => {
  isPaused = false
  animateText()
})
