import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
import scroll_template_1 from "shared/templates/video-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"

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

export default function Video() {

	const height = window.innerHeight;

	const videoScrolly = document.querySelector(`#video-scrolly`);

	videoScrolly.innerHTML = scroll_template_1

	const info = document.querySelector(`#video-infobox`)

	const scrolly = new ScrollyTeller({
		parent: document.querySelector("#scrolly-1"),
		triggerTop: 0.4, // percentage from the top of the screen that the trigger should fire
		triggerTopMobile: 0.8,
		triggerTopTablet: 0.8,
		transparentUntilActive: false,
		bigBoxHeight: 35,
		smallBoxHeight: 10
	});

	const triggers = document.querySelector("#scrolly-1").querySelectorAll(".scroll-text__inner")

	var elementTop = window.pageYOffset + videoScrolly.getBoundingClientRect().top

	var elementBottom = window.pageYOffset + videoScrolly.getBoundingClientRect().bottom

	var distance = elementBottom - elementTop

	var video_duration = 26

	var pixels_per_second = distance / video_duration

	var memory = 0

	var video = document.querySelector("#media-element")

	video.load();

	var renderLoop = function() {

	  requestAnimationFrame( function() {

	  	if (window.pageYOffset > (elementTop - window.innerHeight) && window.pageYOffset < ( elementBottom - window.innerHeight) ) {
	  		
	  		let position = window.pageYOffset - ( elementTop - window.innerHeight )

	  		var playHead = parseFloat((position / pixels_per_second).toFixed(1))

	  		//console.log(playHead)

	  		if (memory!=playHead) {

	  			video.currentTime = playHead

	  			memory = playHead

	  		}

	  		//video.currentTime = parseFloat((position / pixels_per_second).toFixed(1));
	  	}

	    renderLoop();

	  });

	};

	renderLoop();

	triggers.forEach((d, i) => scrolly.addTrigger({ num: i, do: () => {

		relocate(i, locations[i - 1])

	}}))

	scrolly.watchScroll()

	function relocate(id, location) {

		console.log(id)

		info.innerHTML = location.description

	}

}