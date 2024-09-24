function showTesti(d) {
    for(let i=0;  i<d.length; i++){
        let cont = document.querySelectorAll('.testimonial-card')[i];
        cont.querySelectorAll('.testimonial-content')[0].querySelector('p')
            // .innerHTML = '"'+d[i].description.split(' ').slice(0,20).join(' ')+'..."'
            .innerHTML = '"'+d[i].description.substring(0,150)+'..."'
                +cont.querySelectorAll('.testimonial-content')[0].querySelector('p').innerHTML
        cont.querySelectorAll('.testimonial-footer')[0]
            .querySelectorAll('h4')[0].innerHTML =  d[i].name
        cont.querySelectorAll('.testimonial-footer')[0]
            .querySelectorAll('p')[0].innerHTML =  d[i].degree + ' (' + d[i].batch+')'
        cont.querySelectorAll('.testimonial-footer')[0]
            .querySelectorAll('img')[0].src =  d[i].Image
    }
}

window.onload = async function() {
    try{
        const response = await fetch('/api/diia/testimonials', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response){
            const data = await response.json()
            if(data) showTesti(data)
        }
    } catch(e){console.log(e)}
}