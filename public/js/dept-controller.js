import { getParams } from './utils/routingUtils.js'

let [dept] = getParams()
if(dept === undefined){
    dept = 'ice'
}

const dict = {
        "it":"Information Technology",
        "cse":"Computer Science and Engineering",
        "bt":"Bio Technology",
        "ce":"Civil Engineering",
        "ch":"Chemical Engineering",
        "ece":"Electronics And Communication Engineering",
        "ee":"Electrical Engineering",
        "ice":"Instrumentation And Control Engineering",
        "me":"Mechanical Engineering",
        "ipe":"Industrial And Production Enginnering",
        "hum" : "Humanities and Management",
        "chem" : "Chemistry",
        "math" : "Mathematics", 
        "phy" : "Physics"
}

const frame = document.getElementById('main-frame')

document.title = `${dict[dept]} Department | NIT Jalandhar`

frame.setAttribute('src', `http://nitjintranet.ac.in:8081/${dept}/Home`)
