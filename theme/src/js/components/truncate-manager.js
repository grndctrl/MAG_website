import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'

class TruncateManager extends CoreModule {
  init() {
    this.wrappers = document.querySelectorAll('.truncate-wrapper')

    this.wrappers.forEach(wrapper=> {
      wrapper.toggle = wrapper.querySelector('.truncate-toggle')
      wrapper.content = wrapper.querySelector('.truncated-content').innerHTML
      wrapper.toggle.addEventListener('click', this.onToggle.bind(wrapper))
    })

    return super.init()
  }

  destroy() {
    return super.destroy()
  }

  onToggle() {
    this.innerHTML = this.content 
  }
}

export const truncateManager = new TruncateManager()
