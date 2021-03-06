
import rp from 'request-promise'
import mustache from "mustache"

import more from "shared/render/more.html!text"
import image from "shared/render/image.html!text"
import header from "shared/render/header.html!text"
import graphic from "shared/render/graphic.html!text"
import scrollie from "shared/render/scrollie.html!text"
import slider from "shared/render/slider.html!text"
import social from "shared/render/social.html!text"
import bylines from "shared/render/bylines.html!text"
import timelapse from "shared/render/timelapse.html!text"
import footer from "shared/render/footer.html!text"

var url = `https://interactive.guim.co.uk/docsdata/1FY18tgGcpxW_3zqPqaPr03ZmtiVVUZge8-yicvwmi-k.json?t=${new Date().getTime()}`

export async function render() {

    return rp({
        uri: url,
        json: true
    }).then((json) => {

		const html = parser(json)

		return html

    });

}

async function parser(json) {

  return new Promise(function(resolve, reject) {

    let html = `<div class="glacier-interactive-wrapper">`

    for (const [key, value] of Object.entries(json)) {

      const target = key.replace(/[^A-Za-z]+/g, '');

      if (target==='text') {

        html += `<div class="content__main"><div class="gs-container"><div class="content__main-column content__main-column--interactive">`

        for (const k of value) {

          html += content(k)

        }

        html += `</div></div></div>`

      }

      if (target==='headline') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(header, obj)

      }

      if (target==='graphic') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(graphic, obj)

      }

      if (target==='slider') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(slider, obj)

      }

      if (target==='image') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(image, obj)

      }

      if (target==='scrollie') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(scrollie, obj)

      }

      if (target==='footer') {

        var obj = {}

        for (const k of value) {

          obj[k.type] = k.value

        }

        html += mustache.render(footer, { "footer" : value })

      }


    }

    html += `</div>`

    resolve(html)

  });

}

function content(section) {

    switch (section.type) {
      case 'text':
        return `<p>${section.value}</p>`
      break;
      case 'graphic':
        return `<div class="inline_graphic" id="${section.value.id}"><div class="inline_graphic_title"><h3>${section.value.title}</h3></div></div>` 
      break;
      case 'headline':
        return `<h2>${section.value}</h2>`
      break;
       case 'image':
       return mustache.render(image, section.value)
      break;
       case 'more':
       return mustache.render(more, section.value)
      break;
       case 'social':
       return mustache.render(social, section)
      break;
       case 'timelapse':
       return mustache.render(timelapse, section)
      break;
       case 'bylines':
       for (var i = 0; i < section.value.length; i++) {
         section.value[i].suffix = (i === section.value.length - 1) ? "" : (i === section.value.length - 2) ? " and " : ", "
       }
       return mustache.render(bylines, section)
      break;
      default:
      console.log("No state specified. Roll over and go back to sleep")
        return false;
      break;
    }

}