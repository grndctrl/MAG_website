import { CoreModule, CoreScrollScene } from '../core'
import anime from 'animejs'

class AnimHeroSvgIn extends CoreModule {
  init(options) {
    const target = options.target || '.anim-hero-svg-in'
    const elements = document.querySelectorAll(target)

    elements.forEach((element) => {
      let lines = element.querySelectorAll('.line')
      let delay = 1000

      setTimeout(() => {
        this.fadeIn(lines, 0)
      }, delay)
    })

    return super.init()
  }

  fadeIn(lines, index) {
    let y = 10

    anime({
      targets: lines[index],
      opacity: [0, 1],
      translateY: [y, 0],
      easing: 'easeInOutSine',
      duration: 400,
    })

    setTimeout(() => {
      index++

      if (index < lines.length) {
        this.fadeIn(lines, index)
      } else {
        let offset = 36.435639
        let values = [
          9.425781 - offset,
          73.316406 - offset,
          36.435639 - offset
        ]
        this.shift(lines, values, 0)
      }
    }, 100)
  }

  shift(lines, values, index) {
    anime({
      targets: lines[index],
      translateX: [0, values[index]],
      easing: 'easeInOutSine',
      duration: 400,
    })

    setTimeout(() => {
      index++

      if (index < lines.length) {
        this.shift(lines, values, index)
      } 
    }, 100)
  }

  destroy() {
    return super.destroy()
  }
}

export const animHeroSvgIn = new AnimHeroSvgIn()
