// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import Video from "shared/js/video"
//import Climate from "shared/js/climate"

import config from 'shared/settings/settings'
import preflight from 'shared/js/preflight'
const settings = preflight(config)

console.log(settings)



Video(settings)

//Climate()