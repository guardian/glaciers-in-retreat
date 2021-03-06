const twitterBaseUrl = 'https://twitter.com/intent/tweet?text=';
const facebookBaseUrl = 'https://www.facebook.com/dialog/feed?display=popup&app_id=180444840287&redirect_uri=http://www.theguardian.com&link=';
const googleBaseUrl = 'https://plus.google.com/share?url=';

export default function share(title, shareURL, fbImg, twImg, hashTag, description) {

    var twImgText = twImg ? `  ` : '';
    var fbImgQry = fbImg ? `&picture=` : '';
    
    return function (network, extra='') {
        var twitterMessage = ``;
        var shareWindow;

        if (network === 'twitter') {
            shareWindow = twitterBaseUrl + encodeURIComponent(twitterMessage + ' ') + shareURL;
        } else if (network === 'facebook') {
            shareWindow = facebookBaseUrl + shareURL + fbImgQry;
        } else if (network === 'email') {
            shareWindow = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + shareURL;
        } else if (network === 'google') {
            shareWindow = googleBaseUrl + shareURL;
        }

        window.open(shareWindow, network + 'share', 'width=640,height=320');
    }
} 