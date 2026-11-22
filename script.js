// Mapbox GL JS v3.5.2 from CDN
const mapboxgl = window.mapboxgl;

// Mapbox access token — replace with your own public token from https://account.mapbox.com/access-tokens/
const mapBoxToken = 'YOUR_MAPBOX_ACCESS_TOKEN_HERE';

if (mapBoxToken === 'YOUR_MAPBOX_ACCESS_TOKEN_HERE') {
  alert('Add your Mapbox access token in script.js (replace YOUR_MAPBOX_ACCESS_TOKEN_HERE).');
}

mapboxgl.accessToken = mapBoxToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-v9', // real-life imagery base
  center: [-74.006, 40.7128], // start: New York City
  zoom: 13,
  pitch: 0,
  bearing: 0,
});

// Blocky Minecraft look: pixelated rendering + lower zoom snaps to grid
function setBlocky(on) {
  const mapEl = document.getElementById('map');
  const btnBlocky = document.getElementById('btn-blocky');
  const btnReal = document.getElementById('btn-real');
  if (on) {
    mapEl.style.imageRendering = 'pixelated';
    btnBlocky.classList.add('active');
    btnReal.classList.remove('active');
  } else {
    mapEl.style.imageRendering = 'auto';
    btnBlocky.classList.remove('active');
    btnReal.classList.add('active');
  }
}

document.getElementById('btn-blocky').addEventListener('click', () => setBlocky(true));
document.getElementById('btn-real').addEventListener('click', () => setBlocky(false));

setBlocky(true);

// Show coordinates as you move
map.on('move', () => {
  const c = map.getCenter();
  document.getElementById('coord').textContent =
    c.lat.toFixed(4) + ', ' + c.lng.toFixed(4);
});

// Fit to the user's current location if available
if (navigator.geolocation) {
  // Ask for permission before using location
  if (window.confirm('May we use your location to center/fly the map?')) {
    navigator.geolocation.getCurrentPosition((pos) => {
      map.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 15,
        essential: true,
      });
    });
  }
}
