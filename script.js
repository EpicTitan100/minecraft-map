// Mapbox GL JS v3.5.2 from CDN
const mapboxgl = window.mapboxgl;

// Mapbox public token is entered once in the browser and stored locally.
// Never commit a token to the repo: GitHub secret scanning blocks it.
let mapBoxToken = localStorage.getItem('mapboxToken') || '';

if (!mapBoxToken) {
  mapBoxToken = window.prompt('Paste your Mapbox public access token (starts with pk.)') || '';
  if (mapBoxToken) localStorage.setItem('mapboxToken', mapBoxToken);
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
