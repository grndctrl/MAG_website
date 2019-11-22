import {
  CoreModule,
  CoreEventListener,
  CoreScrollScene,
  eventBus
} from '../core'

class Header extends CoreModule {
  init(options) {
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
}

export const header = new Header()
