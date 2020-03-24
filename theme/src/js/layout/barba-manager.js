import { eventBus } from '../core'
import barba from '@barba/core'
import barbaCss from '@barba/css'
import axios from 'axios'
import { CoreModule } from '../core/core-module'

class BarbaManager extends CoreModule {
  init() {
    barba.use(barbaCss)

    console.log('barba-init')

    try {
      barba.init({
        transitions: [
          {
            name: 'barba-fade',

            beforeLeave() {
              console.log('tick')
              document.body.classList.remove('barba-enter')
              document.body.classList.add('barba-leave')
              window.lastMain = document.querySelector('main')
            },

            beforeEnter() {
              console.log('tock')
              document.body.classList.add('barba-enter')
              document.body.classList.remove('barba-leave')

              let main = document.querySelector('.main')
              let scripts = Array.from(main.querySelectorAll('script'))

              scripts.forEach((script) => {
                if (script.getAttribute('src')) {
                  axios
                  .get(script.getAttribute('src'))
                  .then(function(response) {
                    eval(response.data)
                  })
                  .catch(function(error) {
                    console.log(error)
                  })
                } else {
                  document.body.appendChild(script)
                  // console.log(script.innerText)
                }
              })

              window.scrollTo(0, 0)

              eventBus.$emit('barba-before-enter')
            },

            afterEnter() {
              document.body.classList.remove('barba-enter')
              document.body.classList.remove('barba-leave')
            }
          }
        ],
        prevent: ({ href }) => href.charAt(0) === '#'
      })
    } catch (error) {
      return { id: this.id, status: false, message: error }
    }

    return super.init()
  }
}

export const barbaManager = new BarbaManager()
