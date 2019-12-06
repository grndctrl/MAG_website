import { CoreModule } from '../core'
import Swiper from 'swiper'
import { debounce } from 'lodash'

class Slider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider')
    this.swipers = []

    this.sliders.forEach((slider) => {
      let swiper = new Swiper(slider, { 
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })

      let images = slider.querySelectorAll('.slide-image')

      images.forEach(image => {
        let img = image.querySelector('img')
        img.onload = () => {
          if (img.clientWidth/img.clientHeight < 1) {
            image.classList.add('portrait')
            image.setAttribute('data-aspect', img.clientHeight/img.clientWidth)
          } else {
            image.classList.add('landscape')
            image.setAttribute('data-aspect', img.clientHeight/img.clientWidth)
          }

          this.resizeImage(image)
        }
      })

      this.swipers.push(swiper)
    })

    window.addEventListener('resize', debounce(this.resizeSlides.bind(this), 100))

    return super.init()
  }

  resizeSlides() {
    console.log('event')
    this.sliders.forEach((slider) => {
      let images = slider.querySelectorAll('.slide-image')
      images.forEach(image => {
        this.resizeImage(image)
      })
    })
    this.swipers.forEach(swiper => {
      swiper.update()
    })
  }

  resizeImage(image) {
    let aspect = image.getAttribute('data-aspect')
    let maxW = window.innerWidth * 0.8
    let maxH = window.innerHeight - 160

    if (image.classList.contains('landscape')) {

    } else {

    }

    if (maxW * aspect > maxH) {
      image.style.height = maxH + 'px'
      image.style.width = '100%'
    } else {
      image.style.height = '100%'
      image.style.width = maxW + 'px'
    }
  }

  destroy() {
    return super.destroy()
  }
}

export const slider = new Slider()
