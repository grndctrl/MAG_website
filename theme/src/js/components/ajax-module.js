import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'
import axios from 'axios'
import zenscroll from 'zenscroll'

class AjaxModule extends CoreModule {
  init(options) {
    this.target = options.target || '.ajax-load-more'
    this.elements = document.querySelectorAll(this.target)

    this.elements.forEach(element => {
      element.addEventListener('click', this.onClick.bind(element))
    })

    let events = []

    events.push(
      new CoreEventListener(
        'ajax-load-page',
        (event) => {
          console.log("ajax-load-page", event)
          this.onRequest(event)
        }
      )
    )
    super.eventListeners = events

    return super.init()
  }

  onRequest(event) {
    let toggle = document.querySelector('.ajax-load-more')

    let wrapper = '.' + toggle.getAttribute('data-ajax-wrapper')
    let url  = toggle.getAttribute('data-ajax-url')

    axios.get(url).then(result => {
      // console.log("TCL: AjaxModule -> onClick -> result.data", result.data)
      let data = document.createElement('html')
      data.innerHTML = result.data
      let content = data.querySelector(wrapper)
      let next = data.querySelector('.ajax-load-more')
      
      if (next) {
        let button = document.querySelector('.ajax-load-more')
        button.setAttribute('data-ajax-url', next.getAttribute('data-ajax-url'))
      } else {
        let button = document.querySelector('.ajax-load-more')
        button.style.display = 'none'
      }

      Array.from(content.children).forEach(child => {
        document.querySelector(wrapper).appendChild(child)
      })

      if (event.next < event.page) {
        eventBus.$emit('ajax-load-page', {next: event.next + 1, page: event.page, project: event.project})
        console.log('again', {next: event.next + 1, page: event.page, project: event.project})
      } else {
        eventBus.$emit('cursor-bekijk-reinit')
        eventBus.$emit('anim-reinit')
        eventBus.$emit('lazyload-images')
        eventBus.$emit('re-init-links')
        zenscroll.center(document.getElementById(event.project), 1200)
      }
    }, error => {
      console.log('ajax error', error)
    })
  }

  onClick() {
    let wrapper = '.' + this.getAttribute('data-ajax-wrapper')
    let url  = this.getAttribute('data-ajax-url')

    axios.get(url).then(result => {
      // console.log("TCL: AjaxModule -> onClick -> result.data", result.data)
      let data = document.createElement('html')
      data.innerHTML = result.data
      let content = data.querySelector(wrapper)
      let next = data.querySelector('.ajax-load-more')
      
      if (next) {
        let button = document.querySelector('.ajax-load-more')
        button.setAttribute('data-ajax-url', next.getAttribute('data-ajax-url'))
      } else {
        let button = document.querySelector('.ajax-load-more')
        button.style.display = 'none'
      }

      Array.from(content.children).forEach(child => {
        document.querySelector(wrapper).appendChild(child)
      })

      eventBus.$emit('cursor-bekijk-reinit')
      eventBus.$emit('anim-reinit')
      eventBus.$emit('lazyload-images')
      eventBus.$emit('re-init-links')
    }, error => {
      console.log('ajax error', error)
    })
  }

  destroy() {
    this.elements.forEach(element => {
      element.removeEventListener('click', this.onClick.bind(element))
    })

    return super.destroy()
  }
}

export const ajaxModule = new AjaxModule()
