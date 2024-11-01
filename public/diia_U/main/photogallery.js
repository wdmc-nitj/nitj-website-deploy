async function fetchEvents() {
    try {
      const response = await fetch(`/api/diia/gallery`);
      const data = await response.json();
      
      data.sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))  //sorting data in descending order based on Event Date
      console.log(data)
      return data
    } catch (error) {
      console.error('Error fetching events:', error);
    }
}

async function addHTML(){
  try{
    let imageData = await fetchEvents() 
    let image = document.getElementsByClassName("photoimage")
    let caption = document.getElementsByClassName("caption") 
    
    //for latest five events
    let endPoint = 5;
    for(let i = 0 ; i < endPoint && endPoint <= imageData.length ; i++)
    {
      if(imageData[i].showIngallery == true)
      {
        image[i].src = (imageData[i].urls)[0]
        caption[i].innerHTML = imageData[i].category
      }
      else
      {
        //If showIngallery is 'false', then we need to iterate one more step so as to get total of latest 5 events 
        endPoint++
      }
    }
  }
  catch(err)
  {
    console.log(`Error in photoGallery`)
  }
}

window.addEventListener("DOMContentLoaded",addHTML)