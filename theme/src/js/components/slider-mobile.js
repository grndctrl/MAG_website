import { CoreModule } from '../core'
import Swiper from 'swiper/js/swiper.min.js'

class SliderMobile extends CoreModule {
  init() {
    this.sliders = document.querySelectorAll('.slider-mobile')
    this.swipers = []

    this.sliders.forEach((slider) => {
      let swiper = new Swiper(slider, { 
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      })
    })

    // window.addEventListener('resize', debounce(this.resizeSlides.bind(this), 100))

    return super.init()
  }

  // resizeSlides() {
  //   console.log('event')
  //   this.sliders.forEach((slider) => {
  //     let images = slider.querySelectorAll('.slide-image')
  //     images.forEach(image => {
  //       this.resizeImage(image)
  //     })
  //   })
  //   this.swipers.forEach(swiper => {
  //     swiper.update()
  //   })
  // }

  // resizeImage(image) {
  //   let aspect = image.getAttribute('data-aspect')
  //   let maxW = window.innerWidth * 0.8
  //   let maxH = window.innerHeight - 160

  //   if (image.classList.contains('landscape')) {

  //   } else {

  //   }

  //   if (maxW * aspect > maxH) {
  //     image.style.height = maxH + 'px'
  //     image.style.width = '100%'
  //   } else {
  //     image.style.height = '100%'
  //     image.style.width = maxW + 'px'
  //   }
  // }

  destroy() {
    return super.destroy()
  }
}

export const sliderMobile = new SliderMobile()
