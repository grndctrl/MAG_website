import { CoreModule } from '../core'
import Swiper from 'swiper/js/swiper.min.js'

class Slider extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider')
    this.swipers = []

    this.sliders.forEach((slider) => {
      let swiper = new Swiper(slider, { 
        loop: true,
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })

      this.swipers.push(swiper)
    })

    return super.init()
  }

  destroy() {
    return super.destroy()
  }
}

export const slider = new Slider()
