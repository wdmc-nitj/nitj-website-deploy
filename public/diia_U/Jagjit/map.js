// const {countryData} = require('./countriesGJSON/js')
import countryData from './countriesGJSON.js'

const dataSet = [
    {
        country: 'IN',
        color: '#00ff00',
        text: 'Text ABC'
    }
]
const dataSet2 = [
    {
        country: 'CA',
        color:'#0000ff',
        text: 'Text ABC'
    }
]
const dataSet3 = [
    {
        country: 'ZM',
        color: '#ff0000',
        text: 'Text ABC'
    }
]

function getColor(val, dataS) {
    for(const data of dataS) {
        if(data.country == val) {console.log("returning", data.color);return data.color}
    }
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
            return checker(e['properties']['ISO_A2'])
        })
    }
}

window.onload = function() {
    
    var map = L.map('map').setView([0,0], 0.5);
    var map2 = L.map('map2').setView([0,0], 0.5);
    var map3 = L.map('map3').setView([0,0], 0.5);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map3)
    map.attributionControl.setPrefix('NITJ')
    map2.attributionControl.setPrefix('NITJ')
    map3.attributionControl.setPrefix('NITJ')
    function SetColours(mp, CDS) {
        function style(feature) {
            return {
                'fillColor': getColor(feature.properties.ISO_A2, CDS),
                'color': getColor(feature.properties.ISO_A2, CDS),
                'weight': 0.2,
                'opacity': 0.8
            };
        }
        L.geoJSON(GJSONGenerator(CDS), {style: style}).addTo(mp)
    }
    SetColours(map, dataSet)
    SetColours(map2, dataSet2)
    SetColours(map3, dataSet3)
}