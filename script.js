const endpoint = "https://geo.ipify.org/api/v1?apiKey=at_TPQRwlOf0GTWzWy35W2a1HIwcVLel";
const ipSpan = document.getElementById('ip')
const locationSpan = document.getElementById('location')
const timezoneSpan = document.getElementById('timezone')
const ispSpan = document.getElementById('isp')
const locateBtn = document.getElementById('locateBtn')
let finalEndpoint = '';
let lat = '';
let lng = '';

//set first time mapview
const map = L.map('map').setView([0, 0], 2);
const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution
}).addTo(map);

//set first marker
let defaultMarker = L.marker([0, 0], {
    opacity: 0
}).addTo(map);
let markers = []
markers.push(defaultMarker)

locateBtn.addEventListener('click', () => {
    let ip = document.getElementById('ip-input').value;
    finalEndpoint = endpoint + `&ipAddress=${ip}`
    console.log(finalEndpoint)

    fetch(finalEndpoint).then((response) => {
        return response.json();
    }).then(geoPoint => {
        console.log(geoPoint)
        ipSpan.innerText = geoPoint.ip
        locationSpan.innerText = geoPoint.location.city
        timezoneSpan.innerText = geoPoint.location.timezone
        ispSpan.innerText = geoPoint.isp

        lat = geoPoint.location.lat
        lng = geoPoint.location.lng

        //set marker onClick and remove the previous one
        let currentMarker = L.marker([lat, lng]).addTo(map);
        markers.push(currentMarker)
        markers[0].remove();
        markers.shift()
    }).catch((error) => {
        console.error(error);
    })
})