import { $, $$, round, numberWithCommas, wait, getDimensions } from 'shared/js/util'
import shaka from 'shaka-player'
shaka.polyfill.installAll();

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

export class Player {

	constructor(application, video, target) {

		var self = this

        this.player = application

        this.video = application[video]

        this.setUp(target)

        this.html = ""

        //http://v1-6-2.shaka-player-demo.appspot.com/docs/tutorial-player.html
  
    }

    setUp(target) {

        var self = this

        if (!self.player.video.loaded) {

            self.player.video.loaded = true

            self.consoler(`Loading: ${self.player.video.src.trim()}`)

            var video = document.getElementById(target)

            var image = (self.player.portrait && self.video.squared) ? `${self.video.src.trim()}-squared` : self.video.src.trim() ;

            //video.setAttribute('poster', `${self.video.url}/images/${this.player.videoWidth}/${image}.jpg`);

            video.setAttribute('crossorigin', 'anonymous');                

            self.setPlayer(video, self.video)

        }

    }

    setPlayer(video, manifest) {

        var self = this

        var folder = (self.player.portrait && self.video.squared) ? 'squared' : 'standard' ;

        if (self.player.app.isApp) { // HLS videos fron embed folder of gdn-cdn

            self.consoler("Using the app")

            if (self.player.app.isAndroid) {

                self.consoler("Using Android")

                this.initShakaPlayer(video, `${self.video.url}/${folder}/dash/${manifest.src.trim()}-manifest.mpd`);

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

                    this.initShakaPlayer(video, `${self.video.url}/${folder}/dash/${manifest.src.trim().trim()}-manifest.mpd`);

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

        self.consoler(`${self.video.url}/${folder}/hls/${manifest.src.trim()}/index.m3u8`)

        //video.setAttribute('src', `${self.video.url}/${folder}/hls/${manifest.src.trim()}/index.m3u8`);

        video.setAttribute('src', `${self.video.url}/${folder}/${manifest.src.trim()}-${self.player.iosWidth}.mp4`);

        video.load();

    }

    initShakaPlayer(video, manifest) {

        var self = this

        var player = new shaka.Player(video);

        player.load(manifest).then(function() {

            self.consoler("Loaded shaka video")

        }).catch(function(error){

            self.consoler('Error code', error.code, 'object', error);

        });

    }

    consoler(log) {

        var info = document.querySelector(`#video-infobox`)

        if (info) {

            //this.html += `${log}<br/>`

            //info.innerHTML = this.html

        }

        //console.log(log)

    }

}