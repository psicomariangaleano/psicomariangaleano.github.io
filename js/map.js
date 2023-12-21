// Archivo: map.js

// Esta función se llama cuando se carga la API de Google Maps
function initMap() {
    // Ubicación del consultorio
    const consultorioLocation = { lat: 5.018573, lng: -74.009051 };
 
    // Opciones del mapa
    const mapOptions = {
       center: consultorioLocation,
       zoom: 17, // Puedes ajustar el nivel de zoom según sea necesario
    };
 
    // Crea el mapa en el elemento con id "map"
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    // Marcador en la ubicación del consultorio
    const marker = new google.maps.Marker({
       position: consultorioLocation,
       map: map,
       title: "Consultorio de Psicología",
    });
 }
 