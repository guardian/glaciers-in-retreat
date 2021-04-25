// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { numberWithCommas, $, $$, getDimensions } from 'shared/js/util.js'
//import scroll_template_2 from "shared/templates/three-scrolly.html"
import ScrollyTeller from "shared/js/scrollyteller"
import * as THREE from 'three/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


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
