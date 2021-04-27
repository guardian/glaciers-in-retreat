// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import config from 'shared/settings/settings'
import preflight from 'shared/js/preflight'
const settings = preflight(config)

import VideoHeader from "shared/js/videoheader"
import Video from "shared/js/video"
import Slider from "shared/js/slider"

new VideoHeader("#header-video", settings.screenWidth);

Video(settings)

Slider(settings)
