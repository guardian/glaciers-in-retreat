import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
import scroll_template_2 from "shared/templates/three-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"
import Procedural from 'procedural-gl';

var locations = [{
	"name" : "Fox Glacier",
	"description" : "Fox Glacier... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.528725, 
		"longitude": 170.086727,
		"animationDuration" : 0.5
	}
},{
	"name" : "Franz Josef Glacier",
	"description" : "Franz Josef Glacier... Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.460896, 
		"longitude": 170.187081,
		"animationDuration" : 0.5
	}
},{
	"name" : "Fox Glacier",
	"description" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.528725, 
		"longitude": 170.086727,
		"animationDuration" : 0.5
	}
},{
	"name" : "Fox Glacier",
	"description" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.528725, 
		"longitude": 170.086727,
		"animationDuration" : 0.5
	}
},{
	"name" : "Fox Glacier",
	"description" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.528725, 
		"longitude": 170.086727,
		"animationDuration" : 0.5
	}
},{
	"name" : "Fox Glacier",
	"description" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
	"target" : {
		"latitude" : -43.528725, 
		"longitude": 170.086727,
		"animationDuration" : 0.5
	}
}]

export default function Climate() {

	const width = window.innerWidth;

	const height = (window.innerWidth < 740) ? window.innerHeight / 2 : window.innerHeight;

	const climateScrolly = document.querySelector(`#three-scrolly`);

	climateScrolly.innerHTML = scroll_template_2

	const info = document.querySelector(`#three-infobox`)

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

	let container = document.querySelector( '#procedural' );

	container.style.width = `${width}px`

	container.style.height = `${height}px`

	const datasource = {

	  provider: 'maptiler',

	  apiKey: 'Zcl7XuxFhkTfiUL3Yrvp'

	};

	Procedural.init( { container, datasource } );

	Procedural.setRotationControlVisible( false );

	Procedural.setCompassVisible(false)

	const fox = { latitude: -43.528725, longitude: 170.086727 };

	Procedural.displayLocation( fox );

	triggers.forEach((d, i) => scrolly.addTrigger({ num: i, do: () => {

		console.log(`Reset position of map to trigger point ${i}`)

		relocate(i, locations[i - 1])

	}}))

	scrolly.watchScroll()

	function relocate(id, location) {

		//console.log(location.target)

		info.innerHTML = location.description

		Procedural.focusOnLocation ( location.target );

	}

}


