// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import config from 'shared/settings/settings'
import preflight from 'shared/js/preflight'
const settings = preflight(config)

import VideoHeader from "shared/js/videoheader"
import Video from "shared/js/video"
import Slider from "shared/js/slider"

new VideoHeader("#header-video", settings.screenWidth);

new VideoHeader("#timelapse-video", settings.screenWidth);

const observer = new IntersectionObserver(entries => { 
    entries.forEach(entry => {
        entry.intersectionRatio > 0 ? entry.target.play() : entry.target.pause()
    })
})

const timelapses = document.querySelectorAll('.timelapse')
 
timelapses.forEach(timelaps => {
    observer.observe(timelaps)
})

Video(settings)

Slider(settings)

// http://preview.gutools.co.uk/environment/ng-interactive/2021/apr/28/end-of-the-ice-new-zealands-vanishing-glaciers