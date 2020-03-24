import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'
import lozad from 'lozad'
import anime from 'animejs'

class Lazyloader extends CoreModule {
  init(options) {
    this.target = options.target || '.lazy'

    this.observer = lozad(this.target, {
      loaded: this.unblur
    })
    this.observer.observe()

    const events = []
    events.push(
      new CoreEventListener(
        'lazyload-images',
        (event) => {
          this.observer.observe()
        }
      )
    )

    events.push(
      new CoreEventListener(
        'barba-before-enter',
        (event) => {
          this.observer.observe()
        }
      )
    )
    super.eventListeners = events

    return super.init()
  }

  unblur(element) {
    element.classList.add('loaded')
  }

  destroy() {
    return super.destroy()
  }
}

export const lazyloader = new Lazyloader()
