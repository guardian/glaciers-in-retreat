import { supportsSticky } from "./util.js"

class ScrollyTeller {
    constructor(config) {
        this.isMobile = window.innerWidth < 740; // was 740 980
        this.triggerTop = (!this.isMobile) ? config.triggerTop : config.triggerTopMobile;
        this.scrollInner = config.parent.querySelector(".scroll-inner");
        this.scrollText = config.parent.querySelector(".scroll-text");
        this.scrollWrapper = config.parent.querySelector(".scroll-wrapper");
        this.scrollGraphic = config.parent.querySelector(".gv-sticky-graphic");
        this.lastScroll = null;
        this.lastI = null;
        this.lastDirection = null;
        this.triggerPoints = [];
        this.textBoxes = [].slice.apply(this.scrollText.querySelectorAll(".scroll-text__inner"));

        this.started = true;

        this.steps = [].slice.apply(this.scrollText.querySelectorAll(".scroll-text__div"))

        this.transparentUntilActive = config.transparentUntilActive;

        //this.scrollWrapper.style.height = this.textBoxes.length * 100 + "vh";

        var diff = this.scrollGraphic.clientHeight - this.scrollInner.clientHeight;

        if (this.isMobile) {
            this.scrollWrapper.style.height = this.scrollText.clientHeight + "px"; // MY CODE

            if(diff > 0) {
                this.scrollWrapper.style.paddingBottom = diff + "px"; // MY CODE
            }
        } else {
            this.scrollWrapper.style.height = this.textBoxes.length * 100 + "vh";
        }


        if(this.transparentUntilActive) {
            config.parent.classList.add("transparent-until-active");
        }
    }

    checkScroll() {
        if(this.lastScroll !== window.pageYOffset) {
            const bbox = this.scrollText.getBoundingClientRect();

            
    
            if(!supportsSticky) {
                if(bbox.top <= 0 && bbox.bottom >= window.innerHeight) {
                    this.scrollInner.classed("fixed-top", true);
                    this.scrollInner.classed("absolute-bottom", false);
                    this.scrollInner.classed("absolute-top", false);
                } else if(bbox.top <= 0) {
                    this.scrollInner.classed("fixed-top", false);
                    this.scrollInner.classed("absolute-bottom", true);
                    this.scrollInner.classed("absolute-top", false);
                } else {
                    this.scrollInner.classed("fixed-top", false);
                    this.scrollInner.classed("absolute-bottom", false);
                    this.scrollInner.classed("absolute-top", true);
                }
            }
    
            if(bbox.top < (window.innerHeight*(this.triggerTop)) && bbox.bottom > window.innerHeight/2) { 
                //const i = Math.floor(Math.abs(bbox.top - (window.innerHeight*(this.triggerTop)))/bbox.height*this.textBoxes.length);

                this.currentStep = null;

                for (var i = this.steps.length - 1; i >= 0; i--) {

                    const bbox2 = this.steps[i].getBoundingClientRect();

                    if (bbox2.top < window.innerHeight * this.triggerTop) {
                        this.currentStep = i;
                        break;
                    }

                }

                i = this.currentStep;


                const direction = this.lastScroll > window.pageYOffset ? 'up' : 'down'
    
                if(i !== this.lastI) {
                    this.lastI = i;
                    this.lastDirection = direction;
                    
                    // const direction = this.lastScroll > window.pageYOffset ? 'up' : 'down'

                    this.doScrollAction(i, direction);

                    if(this.transparentUntilActive) {
                        this.textBoxes.forEach((el, j) => {
                            if(j <= i) {
                                el.style.opacity = "1";
                            } else if (!this.isMobile) {
                                el.style.opacity = "0.25";
                            } else {
                                el.style.opacity = "1";
                            }
                        });
                    }
                }
            }
    
            this.lastScroll = window.pageYOffset;
        }
    
        window.requestAnimationFrame(this.checkScroll.bind(this));
    }

    doScrollAction(i, direction) {
        const trigger = this.triggerPoints.find(d => d.num === i+1);
        if(this.started && trigger) {
            const step = this.steps[i]
            trigger.do(direction, step);
        }
    }

    watchScroll() {
        window.requestAnimationFrame(this.checkScroll.bind(this));
    }

    addTrigger(t) {
        this.triggerPoints.push(t);
    }

    start() {
        this.started = true
    }
}

export default ScrollyTeller