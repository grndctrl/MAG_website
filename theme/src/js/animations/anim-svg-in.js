import { CoreModule, CoreScrollScene } from '../core'
import anime from 'animejs'
import CSSParser from 'css-translate-matrix-parser';

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
      let matrixValues = CSSParser.fromElement(line.querySelector('g'));
      values.push(matrixValues[4])
    })

    let average = 0
    values.forEach(value => {
      average += value
    })
    average = average / values.length
    this.fadeIn(lines, values, average, index)
  }

  fadeIn(lines, values, average, index) {
    lines[index].style.opacity = 0


    let x = (-1 * (values[index] - average)) + 'px'

    anime({
      targets: lines[index],
      opacity: [0, 1],
      translateX: [x, 0],
      easing: 'easeInOutSine',
      duration: 800,
    })

    setTimeout(() => {
      index++
      if (index < lines.length) {
        this.fadeIn(lines, values, average, index)
      }
    }, 200)

  }

  destroy() {
    return super.destroy()
  }
}

export const animSvgIn = new AnimSvgIn()
