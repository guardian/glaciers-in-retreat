import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
import scroll_template_1 from "shared/templates/video-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"
import { Player } from 'shared/js/player'

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

export default function Video(settings) {

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

	let interval = null

	const triggers = document.querySelector("#scrolly-1").querySelectorAll(".scroll-text__inner")

	const elementTop = window.pageYOffset + videoScrolly.getBoundingClientRect().top

	const elementBottom = window.pageYOffset + videoScrolly.getBoundingClientRect().bottom

	const distance = elementBottom - elementTop

	const video_duration = 26

	const pixels_per_second = distance / video_duration

	let memory = 0

	new Player(settings)

    const video = document.querySelector(`#media-element`);

    interval = setInterval(function() {

        currentState(video).then( (data) => {

        	console.log(data)

            manageState(data)

        })

    }, 1000);

    function init() {

		var renderLoop = function() {

		  requestAnimationFrame( function() {

		  	if (window.pageYOffset > (elementTop - window.innerHeight) && window.pageYOffset < ( elementBottom - window.innerHeight) ) {
		  		
		  		let position = window.pageYOffset - ( elementTop - window.innerHeight )

		  		var playHead = parseFloat((position / pixels_per_second).toFixed(1))

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

    }

	function relocate(id, location) {

		console.log(id)

		info.innerHTML = location.description

	}

    async function currentState(vid) {

        var state = {

            "readyState" : vid.readyState,

            "currentTime" : vid.currentTime,

            "paused" : vid.paused,

            "duration" : vid.duration

        }

        return await state

    }

    function manageState(data) {

        var self = this

        if (data.readyState >= 1) {

            clearTimeout(interval);

            interval = null

            init()

        }

    }

}