import {
  CoreModule,
  CoreEventListener,
  CoreScrollScene,
  eventBus
} from '../core'
import anime from 'animejs'

class Header extends CoreModule {
  init(options) {
    this.lastScrollPos = window.scrollY
    this.scrollingUp = false
    this.scrollOffset = 0
    this.logo = document.querySelector('.header-logo')

    this.element = options.element

    if (this.element) {
      this.setColor()

      let events = []
      events.push(
        new CoreEventListener('pin-header', () => {
          this.pin()
        })
      )
      events.push(
        new CoreEventListener('unpin-header', () => {
          this.unpin()
        })
      )

      events.push(
        new CoreEventListener('header-color', (event) => {
          this.changeColor(event)
        })
      )

      events.push(
        new CoreEventListener('barba-before-enter', (event) => {
          this.setColor()
        })
      )

      super.events = events

      let scenes = []
      scenes.push(
        new CoreScrollScene({
          offset: () => {
            return 20
          },
          enter: (event) => {
            eventBus.$emit('pin-header')
          },
          leave: (event) => {
            eventBus.$emit('unpin-header')
          }
        })
      )
      super.scrollScenes = scenes
    } else {
      return { id: this.id, status: false, message: 'no .header-main element' }
    }

    window.addEventListener('scroll', this.onScroll.bind(this))

    return super.init()
  }

  pin() {
    this.element.classList.add('pinned')
  }

  unpin() {
    this.element.classList.remove('pinned')
  }

  setColor() {
    let currentPage = document
      .querySelector('.main')
      .getAttribute('data-barba-namespace')

    if (currentPage === 'home') {
      this.element.classList.add('light')
      this.element.classList.remove('dark')
    } else {
      this.element.classList.add('dark')
      this.element.classList.remove('light')
    }
  }

  changeColor(event) {
    if (this.element.classList.contains('light')) {
      this.element.classList.add('dark')
      this.element.classList.remove('light')
    } else {
      this.element.classList.add('light')
      this.element.classList.remove('dark')
    }
  }

  onScroll(event) {
    if (window.scrollY < this.lastScrollPos) {
      if (this.scrollingUp === false) {
        this.scrollOffset = 0
      }
      this.scrollOffset += Math.abs(window.scrollY - this.lastScrollPos)
      if (this.scrollOffset > 10) {
        this.showLogo()
      }
      this.scrollingUp = true
    } else {
      if (this.scrollingUp === true) {
        this.scrollOffset = 0
      }
      this.scrollOffset += Math.abs(window.scrollY - this.lastScrollPos)
      if (this.scrollOffset > 40) {
        this.hideLogo()
      }
      this.scrollingUp = false
    }
    this.lastScrollPos = window.scrollY
  }

  showLogo() {
    if (!this.logo.classList.contains('animating')) {
      this.logo.classList.add('animating')
    
      let top = 0
      anime({
        targets: this.logo,
        top: top,
        easing: 'easeInSine',
        duration: 400,
        complete: () => {
          this.logo.classList.remove('animating')
        }
      })
    }
  }

  hideLogo() {
    if (!this.logo.classList.contains('animating')) {
      this.logo.classList.add('animating')
    
      let top = '-' + this.logo.clientHeight + 'px'
      anime({
        targets: this.logo,
        top: top,
        easing: 'easeInSine',
        duration: 400,
        complete: () => {
          this.logo.classList.remove('animating')
        }
      })
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll.bind(this))
    super.destroy()
  }
}

export const header = new Header()
