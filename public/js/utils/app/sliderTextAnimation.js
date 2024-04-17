import { dataFilter } from '../routingUtils.js'

let stringsArray = [
  { title1: 'THE PLACE OF TRANSFORMATION', _id: '1' },

  {
    title1: '72<sup>nd</sup> IN OVERALL NIRF RANKING',
    _id: '2',
  },
  {
    title1: '46<sup>th</sup> IN ENGINEERING NIRF',
    _id: '3',
  },
]

const mainSliderText = document.getElementById('main-slider-text')
let currentIndex = 0
let isPaused = false
let currentElementInside = null
let animationTimeout = null

export default function animateText(stringsArray) {
  if (isPaused) return
  const currentString = stringsArray[currentIndex]
  const newLink = document.createElement('a')
  newLink.innerHTML = currentString.title1
  newLink.href = `/template/index.html?id=${currentString._id}?category=initiative`
  if (currentString.link) {
    newLink.href = currentString.link
  }
  newLink.target = '_blank'
  const newH2 = document.createElement('h2')
  newH2.classList.add('enter-animation')
  newH2.appendChild(newLink)
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

        animateText(stringsArray)
      },
      { once: true }
    )
  }, 2200)
}

fetch('/api/initiative')
  .then((res) => res.json())
  .then((data) => {
    data = dataFilter(data)
    data = data.filter((n) => n.main === true)
    stringsArray = data.map((item) => {
      const returnArray = { title1: item.title1, _id: item._id }
      if (item.externalLink) {
        returnArray['link'] = item.link
      }
      return returnArray
    })
    // console.log(stringsArray)
    animateText(stringsArray)
    mainSliderText.addEventListener('mouseenter', () => {
      isPaused = true
      clearTimeout(animationTimeout)
      currentElementInside.classList.remove('exit-animation')
      console.log('stopping animation')
    })

    mainSliderText.addEventListener('mouseleave', () => {
      isPaused = false
      animateText(stringsArray)
    })
  })
  .catch((err) => {
    console.log(err)
    animateText(stringsArray)
  })

animateText(stringsArray)
