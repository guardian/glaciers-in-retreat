import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
import scroll_template_1 from "shared/templates/video-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"
import { Player } from 'shared/js/player'
import get from 'shared/js/ajax'

export default function Video(settings) {

	const height = window.innerHeight;

	const width = window.innerWidth;

	const locations = settings.locations

	const videoScrolly = document.querySelector(`#video-scrolly`);

	videoScrolly.innerHTML = scroll_template_1

	const info = document.querySelector(`#video-infobox`)

	var vs = getDimensions(videoScrolly)

	const scrolly = new ScrollyTeller({
		parent: document.querySelector("#scrolly-1"),
		triggerTop: 0.4, // percentage from the top of the screen that the trigger should fire
		triggerTopMobile: 0.8,
		triggerTopTablet: 0.8,
		transparentUntilActive: false,
		bigBoxHeight: 35,
		smallBoxHeight: 10
	});

	const containter = document.querySelector(`#map-container`)

    const overlay = document.querySelector(` #map-overlay`)

    const panel = document.querySelector(`#panel`)

	let interval = null

	const triggers = document.querySelector("#scrolly-1").querySelectorAll(".scroll-text__inner")

	const elementTop = window.pageYOffset + videoScrolly.getBoundingClientRect().top

	const elementBottom = window.pageYOffset + videoScrolly.getBoundingClientRect().bottom

	const distance = elementBottom - elementTop

	const video_duration = 34

	const pixels_per_second = distance / video_duration

	const context = (settings.portrait) ? { width : 1080, height : 1080 } : { width : 1920, height : 1080 }

	const dimensions = (settings.portrait) ? fitSquareIntoBounds({ width : vs[0], height : vs[1]}) : fitRectIntoBounds(context, { width : vs[0], height : vs[1]})

	const ut = { context : context, height : vs[0], width : vs[1], dimensions : dimensions }

	let memory = 0

	new Player(settings, 'video', `media-element`)

    const video = document.querySelector(`#media-element`);

	var startTime = 0;

	var endTime = 0;

	var currentGlacier = 0

	var svg

    containter.style.width = `${dimensions.width}px`
    containter.style.height = `${dimensions.height}px`
    containter.style.marginTop = `${dimensions.top}px`
    containter.style.marginLeft = `${dimensions.left}px`

    var url = (settings.portrait) ? '<%= path %>/square.svg' : '<%= path %>/map.svg'

    get(url).then((response)=>{
        
        var mapSVG=Array.from(
            new DOMParser()
              .parseFromString(response,'image/svg+xml')
              .childNodes
          ).filter(node=>{
            let tag=node.tagName
            if(typeof tag=='undefined') return false
            return tag.toLowerCase()=='svg'
          })[0]

          overlay.appendChild(mapSVG);

         svg = document.querySelector('#mapstar');

    })

    interval = setInterval(function() {

        currentState(video).then( (data) => {

            manageState(data)

        })

    }, 1000);

    function init() {

    	/*

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

		*/



		triggers.forEach((d, i) => scrolly.addTrigger({ num: i, do: (direction) => {

			relocate(i, locations[i - 1], direction)

		}}))

		scrolly.watchScroll()

    }

	function relocate(id, location, direction) {

		currentGlacier = id

        var txt = svg.querySelectorAll('.map-overlay');

		txt.forEach((element, i) => {

			element.style.display = "none";

		})

		if (direction === "down") {

			if (location.play) {

				endTime = location.finish

				startTime = location.start

			    currentState(video).then( (status) => {

			    	if (status.paused) {

			    		video.currentTime = location.start

			    		playVideo()

			    	} else {

			    		video.currentTime = location.start
			    	}

			    })
				
				// play the video if something is not already playing

			} else {

				video.currentTime = location.start

				var label = svg.querySelector(`#overlay-${currentGlacier}`);
		          
		        label.style.display = "block";

			}

		} else {

		    currentState(video).then( (status) => {

		    	if (!status.paused) {

		    		video.pause()

		    	}

		    	video.currentTime = location.finish

				var label = svg.querySelector(`#overlay-${currentGlacier}`);
				  
				label.style.display = "block";


		    })

		}

		info.innerHTML = location.description

	}

	function playVideo() {

	    function checkTime() {
	        if (video.currentTime >= endTime) {
	           video.pause();
	           var label = svg.querySelector(`#overlay-${currentGlacier}`);
	           label.style.display = "block";
	        } else {

	           setTimeout(checkTime, 100);
	        }
	    }

	    video.currentTime = startTime;
	    video.play();
	    checkTime();
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

    function fitSquareIntoBounds(viewport) {

    	var newDimensions = {}

    	if (viewport.height > viewport.width) {

    		newDimensions.height = viewport.height;

			newDimensions.width = viewport.height;

			newDimensions.left =  Math.abs( (newDimensions.height - viewport.width) / 2 ) * -1

			newDimensions.top = 0

    	} else {

    		newDimensions.height = viewport.width;

			newDimensions.width = viewport.width;

			newDimensions.left =  Math.abs( (newDimensions.width - viewport.height) / 2 ) * -1

			newDimensions.top = 0

    	}

    	return newDimensions;

    }

	function fitRectIntoBounds(map, viewport) {

		map.ratio = map.width / map.height

		viewport.ratio = viewport.width / viewport.height

		var newDimensions = {}

		if (map.ratio > viewport.ratio) {

			newDimensions.height = viewport.height;

			newDimensions.width = newDimensions.height / (map.height / map.width);

			newDimensions.left = (newDimensions.width > viewport.width) ? Math.abs( (newDimensions.width - viewport.width) / 2 ) * -1 : (newDimensions.width - viewport.width) / 2

			newDimensions.top =  0

		} else {

			newDimensions.width = viewport.width;

			newDimensions.height = newDimensions.width / (map.width / map.height);

			newDimensions.left = 0

			newDimensions.top = (newDimensions.height > viewport.height) ? Math.abs( (newDimensions.height - viewport.height) / 2 ) * -1 : (newDimensions.height - viewport.height) / 2

		}

		if (viewport.ratio > map.ratio) {

			console.log( Math.abs( (newDimensions.height - viewport.height) / 2 ) * -1)

    		panel.style.marginTop = `${Math.abs( (newDimensions.height - viewport.height) / 2 ) * -1}px`

		}

		console.log(map.ratio, viewport.ratio)

		return newDimensions;

	}

}