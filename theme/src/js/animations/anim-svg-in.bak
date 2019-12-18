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
    const words = Array.from(svg.querySelectorAll('.word'))
    const index = 0

    for (let i = words.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let x = words[i];
      words[i] = words[j];
      words[j] = x;
    }

    this.fadeIn(words, index)
  }

  fadeIn(words, index) {
    words[index].style.opacity = 0
    let x = Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1)
    let y = -10

    anime({
      targets: words[index],
      opacity: [0, 1],
      translateX: [0, 0],
      translateY: [0, 0],
      easing: 'easeInOutSine',
      duration: 400,
    })

    setTimeout(() => {
      index++
      if (index < words.length) {
        this.fadeIn(words, index)
      }
    }, 50)

  }

  destroy() {
    return super.destroy()
  }
}

export const animSvgIn = new AnimSvgIn()
