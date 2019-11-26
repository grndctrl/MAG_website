import { CoreModule } from '../core'
import anime from 'animejs'

class Expander extends CoreModule {
  init() {
    this.wrappers = document.querySelectorAll('.expander-wrapper')

    this.wrappers.forEach(wrapper => {
      let toggle = wrapper.querySelector('.expander-toggle')
      toggle.addEventListener('click', this.onToggle.bind(wrapper))
    })

    return super.init()
  }

  destroy() {
    this.wrappers.forEach(wrapper => {
      let toggle = wrapper.querySelector('.expander-toggle')
      toggle.removeEventListener('click', this.onToggle.bind(wrapper))
    })

    return super.destroy()
  }

  onToggle(event) {
    this.classList.toggle('active')
    let h = this.querySelector('.expander-content').clientHeight
    let toggleWrapper = this.querySelector('.expander-toggle-wrapper')
    let contentWrapper = this.querySelector('.expander-content-wrapper')

    anime({
      targets: toggleWrapper,
      height: 0,
      opacity: 0,
      easing: 'easeInOutCirc',
      duration: 600,
      complete: () => {
        toggleWrapper.style.display = 'none'
      }
    })

    anime({
      targets: contentWrapper,
      height: [0, h],
      opacity: [0, 1],
      easing: 'easeInOutCirc',
      duration: 600, 
    })
  }
}

export const expander = new Expander()
