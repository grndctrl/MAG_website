import { eventBus } from '../core'
import { CoreModule } from '../core/core-module'
import { CoreEventListener } from '../core/core-event'

class Nav extends CoreModule {
  init(options) {
    this.element = options.element
    this.scrollY = 0

    this.addEventListeners()

    this.toggles = document.querySelectorAll('.toggle-menu')
    this.toggles.forEach((toggle) => {
      toggle.addEventListener('click', this.onToggle)
    })

    this.navMenuItems = document.querySelectorAll('.nav-menu-item')
    this.navMenuItems.forEach((closer) => {
      closer.addEventListener('click', this.onClose)
    })

    this.activateMenuItemForCurrentPage()
    
    return super.init()
  }

  destroy() {
    super.destroy()

    this.toggles.forEach((toggle) => {
      toggle.removeEventListener('click', this.onToggle)
    })

    this.navMenuItems.forEach((closer) => {
      closer.removeEventListener('click', this.onClose)
    })
  }

  onToggle(event) {
    eventBus.$emit('toggle-menu', event)
  }

  onClose(event) {
    eventBus.$emit('close-menu', event)
  }

  addEventListeners() {
    let events = []
    
    events.push(
      new CoreEventListener('toggle-menu', () => {
        this.toggleMenu()
      })
    )

    
    events.push(
      new CoreEventListener('close-menu', () => {
        this.closeMenu()
      })
    )

    events.push(
      new CoreEventListener('barba-before-enter', () => {
        this.activateMenuItemForCurrentPage()
      })
    )

    super.events = events
  }

  closeMenu() {
    if (this.element.classList.contains('animating')) {
      return
    }

    if (this.element.classList.contains('active')) {
      document.body.classList.remove('menu-open')
      this.element.classList.remove('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    }
  }

  toggleMenu() {  
    if (this.element.classList.contains('animating')) {
      return
    }

    if (this.element.classList.contains('active')) {
      this.element.classList.remove('active')
      this.element.classList.add('animating')
      document.body.classList.remove('menu-open')
      setTimeout(() => {
        this.element.classList.remove('animating')
      }, 400)
    } else {
      this.scrollY = window.scrollY
      this.element.classList.add('active')
      this.element.classList.add('animating')
      setTimeout(() => {
        this.element.classList.remove('animating')
        document.body.classList.add('menu-open')
      }, 400)
    }
  }

  activateMenuItemForCurrentPage() {
    let currentPage = document.querySelector('.main').getAttribute('data-barba-namespace')

    this.navMenuItems.forEach(item => {
      item.classList.remove('active')

      if (item.getAttribute('data-nav-target') === currentPage) {
        item.classList.add('active')
      }
    })
  }
}

export const nav = new Nav()
