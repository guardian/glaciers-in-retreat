class VideoHeader {
    constructor(selector, width) {

        this.width = width

        const $video = document.querySelector(selector);
        this.options = { 
            selector, 
            breakpoints: { default: { src: $video.getAttribute('data-src') } } 
        };

        $video.querySelectorAll('[data-src]').forEach(element => this.options.breakpoints[element.getAttribute('data-mw')] = { src: element.getAttribute('data-src') });
        $video.innerHTML = '';
        
        this.responseVideo(this.options);

        this.resizer();
    }

    resizer() {
        window.addEventListener("resize", () => this.responseVideo(this.options));
    }

    responseVideo(options) {
        var self = this
        const {selector, breakpoints} = options;
        let $video = document.querySelector(selector);
        const widthNow = $video.getAttribute('data-width-now') || null;
        const maxBreakpoint = Math.max(Object.keys(breakpoints).find(key => { return +key >= self.width}));
        const nowBreakpoint = maxBreakpoint || 'default';
        if(widthNow && widthNow == nowBreakpoint) return;

        $video.setAttribute('data-width-now', nowBreakpoint);
        $video.src = breakpoints[nowBreakpoint].src;
    }
}

export default VideoHeader


