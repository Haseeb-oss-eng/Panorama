// Load Leaflet and required plugins
var osm = L.tileLayer.provider("OpenStreetMap.Mapnik");
var Topomap = L.tileLayer.provider("OpenTopoMap.Mapnik");
var Esrimap = L.tileLayer.provider("Esri.WorldStreetMap");
var Usda = L.tileLayer.provider("USGS.USImagery");

// Define basemap layers
var basemap = {
    'OpenStreetMap': osm,
    'TopoMap': Topomap,
    'ESRI World': Esrimap,
    'US Imagery': Usda
};

// Create the map and set the initial layer
var map = L.map('map', {
    center: [20.59, 78.96],
    zoom: 5,
    layers: [Usda]  // Initial layer
});

// Add basemap layers control
L.control.layers(basemap).addTo(map);

// Create Measure Control
var ctrlMeasure = L.control.polylineMeasure({
    position: 'topleft',
    measureControlTitle: 'Measure Length'
}).addTo(map);

// Your existing Leaflet.js code...

// Image overlay
var imageBounds = [[20.49, 78.86], [20.69, 79.06]];
var image = L.imageOverlay("static/DJI_stitch.jpg", imageBounds,{interactive: true}).addTo(map);

// Switch to panorama on image click
image.on('click', function () {
    document.getElementById('map').style.display = 'none'; // Hide the map
    panoramaLoad();
});

function panoramaLoad() {
    var panoramaContainer = document.getElementById('panorama');
    panoramaContainer.style.display = 'block'; // Show the panorama container

    var panorama = pannellum.viewer('panorama', {
        type: "equirectangular",
        panorama: "static/DJI_stitch.jpg",
        autoLoad: true,
        default_fov: 90,
        showControls: true,
        autoRotate: -1,
        hotSpots: Array.from({length: 6}, (_, i) => ({
            pitch: 0,
            yaw: i * 60,
            cssClass: "custom-hotspot",
            createTooltipFunc: hotspot,
            createTooltipArgs: `${i * 60} degrees`
        }))
    });

    function hotspot(hotSpotDiv, args) {
        hotSpotDiv.classList.add('custom-tooltip');
        var span = document.createElement('span');
        span.innerHTML = args;
        hotSpotDiv.appendChild(span);
        span.style.width = span.scrollWidth - 20 + 'px';
        span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
        span.style.marginTop = -span.scrollHeight - 12 + 'px';
    }
}


 // Toggle between map and panorama on button click
 const toggleButton = document.getElementById('toggleButton');
 toggleButton.addEventListener('click', function () {
     const mapContainer = document.getElementById('map');
     const panoramaContainer = document.getElementById('panorama');

     if (mapContainer.style.display === 'none') {
         // Show the map and hide the panorama
         mapContainer.style.display = 'block';
         panoramaContainer.style.display = 'none';
     } else {
         // Show the panorama and hide the map
         mapContainer.style.display = 'none';
         panoramaContainer.style.display = 'block';
     }
 });
