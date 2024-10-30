async function fetchEvents() {
    try {
      const response = await fetch(`https://nitjfinal.onrender.com/api/diia/gallery`);
      const data = await response.json();
      
      data.sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))  //sorting data in descending order based on Event Date
      console.log(data)
      return data
    } catch (error) {
      console.error('Error fetching events:', error);
    }
}

async function addHTML(){
  let imageData = await fetchEvents() 
  let image = document.getElementsByClassName("photoimage")
  let caption = document.getElementsByClassName("caption")
  for(let i = 0 ; i < 5; i++)
  {
    image[i].src = (imageData[i].urls)[0]
    caption[i].innerHTML = imageData[i].category
  }
}

window.addEventListener("DOMContentLoaded",addHTML)