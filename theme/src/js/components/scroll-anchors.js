import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class ScrollAnchors extends CoreModule {
  init() {
    this.scrollAnchors = document.querySelectorAll('.scroll-anchor')
    
    const scenes = []

    this.scrollAnchors.forEach(anchor => {
      let scrollEvent = anchor.getAttribute('data-scroll-event')
      let scrollOffset = anchor.getAttribute('data-scroll-offset') ? anchor.getAttribute('data-scroll-offset') : 0
      let scrollHook = anchor.getAttribute('data-scroll-hook') ? anchor.getAttribute('data-scroll-hook') : 1

      scenes.push(
        new CoreScrollScene({
          offset: () => {
            return parseFloat(scrollOffset) + 'px'
          },
          triggerElement: anchor,
          triggerHook: parseFloat(scrollHook),
          enter: (event) => {
            eventBus.$emit(scrollEvent, { element: anchor, trigger: 'enter' })
          },
          leave: (event) => {
            eventBus.$emit(scrollEvent, { element: anchor, trigger: 'leave' })
          }
        })
      )
    })

    super.scrollScenes = scenes

    return super.init()
  }

  destroy() {
    return super.destroy()
  }
}

export const scrollAnchors = new ScrollAnchors()
