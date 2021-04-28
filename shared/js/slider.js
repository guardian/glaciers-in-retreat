import Swiper from "swiper";

export default function Slider() {

	var fastSpeed = 400;
	var slowSpeed = 12000;

	var swiper = new Swiper('.swiper-container', {
	    slidesPerView: 3,
	    centeredSlides: false,
	    spaceBetween: 1,
	    loop: true,
	    grabCursor: true,
	    freeMode: true,
	    roundLengths: true,
	    autoplay: {
	        delay: 0,
	        disableOnInteraction: false
	    },
	    breakpoints: {
	        320: {
	            slidesPerView: 1.2,
	            spaceBetween: 1
	        },
	        660: {
	            slidesPerView: 1.6,
	            spaceBetween: 1
	        },
	        980: {
	            slidesPerView: 2.1,
	            spaceBetween: 1
	        }
	    },
	    speed: slowSpeed
	});

	var isAndroidApp = (window.location.origin === "file://" || window.location.origin === null || window.location.origin === "https://mobile.guardianapis.com" && /(android)/i.test(navigator.userAgent) ) ? true : false ;
	 
	if (isAndroidApp && window.GuardianJSInterface.registerRelatedCardsTouch) {

	    i = 0;

	    swiper.forEach(swipe => {
	        var index = i;
	        swiper[index].wrapperEl.addEventListener("touchstart", function () {
	            window.GuardianJSInterface.registerRelatedCardsTouch(true);
	        });
	        swiper[index].wrapperEl.addEventListener("touchend", function () {
	            window.GuardianJSInterface.registerRelatedCardsTouch(false);
	        });
	        i++;
	    });
	}

}