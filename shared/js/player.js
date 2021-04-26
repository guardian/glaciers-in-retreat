import { $, $$, round, numberWithCommas, wait, getDimensions } from 'shared/js/util'
import shaka from 'shaka-player'
shaka.polyfill.installAll();

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

export class Player {

	constructor(application) {

		var self = this

        this.player = application

        this.setUp()

        //http://v1-6-2.shaka-player-demo.appspot.com/docs/tutorial-player.html
  
    }

    setUp() {

        var self = this

        if (!self.player.video.loaded) {

            self.player.video.loaded = true

            self.consoler(`Loading: ${self.player.video.src.trim()}`)

            var video = document.getElementById(`media-element`)

            var image = (self.player.portrait) ? `${self.player.video.src.trim()}-squared` : self.player.video.src.trim() ;

            video.setAttribute('poster', `https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/images/${this.player.videoWidth}/${image}.jpg`);

            video.setAttribute('crossorigin', 'anonymous');                

            self.setPlayer(video, self.player.video)

        }

    }

    setPlayer(video, manifest) {

        var self = this

        var folder = (self.player.portrait) ? 'squared' : 'standard' ;

        console.log(`https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/${folder}/hls/${manifest.src.trim()}/index.m3u8`)

        if (self.player.app.isApp) { // HLS videos fron embed folder of gdn-cdn

            self.consoler("Using the app")

            //self.consoler(`Android: ${self.player.app.isAndroid}`)

            //https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/standard/dash/DRONE_LOOP-manifest.mpd

            if (self.player.app.isAndroid) {

                self.consoler("Using Android")

                this.initShakaPlayer(video, `https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/${folder}/dash/${manifest.src.trim()}-manifest.mpd`);

            } else {

                self.consoler(`Using iOS: ${self.player.app.isIos}`)

                self.consoler(`iPhone: ${self.player.app.isiPhone}`)

                self.consoler(`iPad: ${self.player.app.isiPad}`)

                this.initHLSPlayer(video, manifest, folder)

            }

        } else {

            if (self.player.app.isIos) {

                self.consoler(`Using iOS (not the app): ${self.player.app.isIos}`)

                this.initHLSPlayer(video, manifest, folder)

            } else {

                if (shaka.Player.isBrowserSupported()) {

                    self.consoler("Using the shaka player")

                    this.initShakaPlayer(video, `https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/${folder}/dash/${manifest.src.trim().trim()}-manifest.mpd`);

                } else {  

                    self.consoler("Using HLS video")

                    this.initHLSPlayer(video, manifest, folder)

                } 

            }

        }

    }

    initHLSPlayer(video, manifest, folder) {

        var self = this

        self.consoler("Using HLS video")

        video.setAttribute('src', `https://interactive.guim.co.uk/embed/aus/2020/frontline/dev-1/episode-1/${folder}/hls/${manifest.src.trim().trim()}/index.m3u8`);

        video.load();

    }

    initShakaPlayer(video, manifest) {

        var self = this

        var player = new shaka.Player(video);

        player.load(manifest).then(function() {

            console.log("Boom")

        }).catch(function(error){

            self.consoler('Error code', error.code, 'object', error);

        });

    }

    consoler(log) {

        console.log(log)

    }

}