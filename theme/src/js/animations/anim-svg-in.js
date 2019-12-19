import { CoreModule, CoreScrollScene } from '../core'
import anime from 'animejs'

class AnimSvgIn extends CoreModule {
  init(options) {
    const target = options.target || '.anim-svg-in'
    const elements = document.querySelectorAll(target)
    const scenes = []

    elements.forEach((element) => {
      const delay =
        element.getAttribute('data-anim-delay') > 0
          ? element.getAttribute('data-anim-delay')
          : 0
      const once = element.getAttribute('data-anim-once') == 'false' ? false : true

      scenes.push(
        new CoreScrollScene({
          triggerElement: element,
          triggerHook: 0.66667,
          enter: (event) => {
            this.svgIn(element)
          },
          once: once
        })
      )
    })

    super.scrollScenes = scenes

    return super.init()
  }

  svgIn(wrapper) {
    const svg = wrapper.querySelector('svg')
    const lines = Array.from(svg.querySelectorAll('.line'))
    const index = 0
    let values = []

 
    lines.forEach(line => {
      const transform = line.querySelector('g').getAttribute('transform')
      const tx = parseFloat(transform.match(/\((.*)\)/)[1].split(', ')[0])

      values.push(tx)
    })

    let average = 0
    values.forEach(value => {
      average += value
    })
    average = average / values.length
    this.shift(lines, values, average, index)
  }

  fadeIn(lines, values, average, index) {
    let x = (-1 * (values[index] - average)) + 'px'

    anime({
      targets: lines[index],
      opacity: [0, 1],
      translateX: [x, x],
      translateY: [10, 0],
      easing: 'easeInOutSine',
      duration: 400,
    })

    setTimeout(() => {
      index++
      if (index < lines.length) {
        this.fadeIn(lines, values, average, index)
      } else {
        this.shift(lines, values, average, 0)
      }
    }, 100)

  }

  shift(lines, values, average, index) {
    let x = (-1 * (values[index] - average)) + 'px'

    anime({
      targets: lines[index],
      opacity: [0, 1],
      translateX: [x, 0],
      easing: 'easeInOutSine',
      duration: 400,
    })

    setTimeout(() => {
      index++

      if (index < lines.length) {
        this.shift(lines, values, average, index)
      } 
    }, 100)
  }

  destroy() {
    return super.destroy()
  }
}

export const animSvgIn = new AnimSvgIn()
