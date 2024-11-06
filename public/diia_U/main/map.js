import countryData from './countriesGJSON.js'

function getColor(val, dataS) {
    for(const data of dataS)
        if(data.country == val) return data.color
}

function getText(val, dataS) {
    for(const data of dataS)
        if(data.country == val) return data.maptext
}

function GJSONGenerator(dataS) {
    function checker(val) {
        for(const data of dataS) {
            if(data.country == val) return true
        }
        return false
    }

    return {
        "type": "FeatureCollection",
        "features": countryData["features"].filter(e=>{
            return checker(e['properties']['ADMIN'])
        })
    }
}
document.addEventListener('DOMContentLoaded',genMaps)
async function genMaps() {
    
    let config = {
        center: [0,10],
        zoom:0.5,
        zoomControl: false, 
        dragging: false,    
        zoomSnap: 0.1,
        scrollWheelZoom: false, 
        doubleClickZoom: false, 
        boxZoom: false,         
        keyboard: false,        
        touchZoom: false 
    }

    var map = L.map('map', config);
    var map2 = L.map('map2', config);
    var map3 = L.map('map3', config);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 3,
        minZoom:0.2,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 3,
        minZoom:0.2
    }).addTo(map2)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 3,
        minZoom:0.2
    }).addTo(map3)
    
    map.attributionControl.setPrefix('')
    map2.attributionControl.setPrefix('')
    map3.attributionControl.setPrefix('')
    function SetColours(mp, CDS) {
        function style(feature) {
            return {
                'fillColor': getColor(feature.properties.ADMIN, CDS),
                'color': getColor(feature.properties.ADMIN, CDS),
                'weight': 0.2,
                'opacity': 0.8,
                'fillOpacity': 1,
            };
        }
        L.geoJSON(GJSONGenerator(CDS), {
            style: style,
            onEachFeature: function(feature, layer) {
                layer.on({
                    mouseover: function(e) {
                        var layer0 = e.target;
                        layer0.bindTooltip(getText(feature.properties.ADMIN, CDS), {permanent:false, direction: 'top'}).openTooltip()
                    },
                    mouseout: function (e) {
                        e.target.closeTooltip();
                    },
                    // click: function(e) {
                    //     e.target.setStyle({
                    //         border: 'none'
                    //     })
                    // }
                })
            }
        }).addTo(mp)
    }

    try {
        const response = await fetch(`/api/diia/maps`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response) {
            const data = await response.json()
            if(data) {
                SetColours(map, data.filter(e=>String(e.type).toLowerCase()=='student' && e.show))
                SetColours(map2, data.filter(e=>String(e.type).toLowerCase()=='research' && e.show))
                SetColours(map3, data.filter(e=>String(e.type).toLowerCase()=='alumni' && e.show))
            }
        }
    }
    catch(e) {
        console.log(e)
    }
}