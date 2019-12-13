import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'
import axios from 'axios'

class AjaxModule extends CoreModule {
  init(options) {
    this.target = options.target || '.ajax-load-more'
    this.elements = document.querySelectorAll(this.target)

    this.elements.forEach(element => {
      element.addEventListener('click', this.onClick.bind(element))
    })

    return super.init()
  }

  onClick() {
    console.log(this)

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
