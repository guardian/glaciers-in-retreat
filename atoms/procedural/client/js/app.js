// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
//import scroll_template_2 from "shared/templates/three-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"
import Procedural from 'procedural-gl';
// import * as THREE from 'three/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
const width = window.innerWidth;

const height = window.innerHeight;

const scrolly = new ScrollyTeller({
	parent: document.querySelector("#scrolly-2"),
	triggerTop: 0.4, // percentage from the top of the screen that the trigger should fire
	triggerTopMobile: 0.8,
	triggerTopTablet: 0.8,
	transparentUntilActive: false,
	bigBoxHeight: 35,
	smallBoxHeight: 10
});

const triggers = document.querySelector("#scrolly-2").querySelectorAll(".scroll-text__inner")

triggers.forEach((d, i) => scrolly.addTrigger({ num: i, do: () => {
	console.log(i)
}}))


scrolly.watchScroll()

let container = document.querySelector( '#procedural' );

container.style.width = `${width}px`

container.style.height = `${height}px`

console.log(`Height: ${window.innerHeight}`)





// Build New Zealand in an afternoon
// https://www.pheelicks.com/posts/build-new-zealand-in-an-afternoon/

/*
An imagery datasource, typically aerial imagery. The data format is XYZ tiles of size 256px. Data formats supported: jpeg, png & webp
An elevation datasource. The data format is XYZ tiles of size 512px in png format

const datasource = {
  elevation: {
    apiKey: 'API_KEY_FROM_www.nasadem.xyz',
    attribution: '&copy;<a href="https://www.nasadem.xyz">nasadem.XYZ</a>',
    pixelEncoding: 'nasadem', // or 'terrain-rgb', 'terrarium'
    urlFormat: 'https://www.nasadem.xyz/api/v1/dem/{z}/{x}/{y}.png?key={apiKey}'
  },
  imagery: {
    apiKey: 'API_KEY_FROM_YOUR_IMAGERY_PROVIDER',
    urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key={apiKey}',
    attribution: '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
};

*/

// Configure datasources
const datasource = {
  provider: 'maptiler',
  // To get a free key, use https://cloud.maptiler.com/account/?ref=procedural
  apiKey: 'Zcl7XuxFhkTfiUL3Yrvp'
};

// Initialize library and optionally add UI controls
Procedural.init( { container, datasource } );

Procedural.setRotationControlVisible( false );

Procedural.setCompassVisible(false)

// Load real-world location
const fox = { latitude: -43.528725, longitude: 170.086727 };

Procedural.displayLocation( fox );


// Optionally can also supply:
// - viewing angle,
// - a bearing,
// - a distance,
// - animation duration (in seconds)

/*
var step = {
  latitude: -43.464245, longitude: 170.147631, // -43.464245, 170.147631
  angle: 20, bearing: 30, distance: 1000,
  animationDuration: 0.5
};

Procedural.focusOnLocation ( step );


Procedural.onLocationFocused = function () {
  console.log("Complate")
};

*/


//Procedural.pause()

//Procedural.play()

