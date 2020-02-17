import { CoreModule, CoreScrollScene, CoreEventListener, eventBus } from '../core'
import zenscroll from 'zenscroll'

class PagedProjectsManager extends CoreModule {
  init() {
    this.links = document.querySelectorAll('.paged-projects-link')
    
    this.links.forEach(link => {
      link.addEventListener('click', this.onClick.bind(link))
    })

    let events = []

    events.push(
      new CoreEventListener(
        'barba-before-enter',
        (event) => {
          if (document.querySelector('.paged-project-manager')) {
            if (window.lastMain) {
              if (window.lastMain.classList.contains('project-page')) {
                let page = parseInt(window.lastPage)
                let project = window.lastProject
                console.log("TCL: PagedProjectsManager -> init -> page", page)
                if (page > 1) {
                  eventBus.$emit("ajax-load-page", {next: 2, page: page, project: project})
                } else {
                  zenscroll.center(document.getElementById(project), 1200)
                }
              }
            }
          } 
        }
      )
    )

    events.push(
      new CoreEventListener(
        're-init-links',
        (event) => {
          this.links.forEach(link => {
            link.addEventListener('click', this.onClick.bind(link))
          })

          this.links = document.querySelectorAll('.paged-projects-link')
          this.links.forEach(link => {
            link.addEventListener('click', this.onClick.bind(link))
          })
        }
      )
    )
    super.eventListeners = events

    return super.init()
  }

  onClick() {
    window.lastProject = this.getAttribute('project-slug')
    window.lastPage = this.getAttribute('project-page')
    console.log("TCL: PagedProjectsManager -> link.onclick -> link.getAttribute('project-page')", this.getAttribute('project-page'))
  }

  destroy() {
    return super.destroy()
  }
}

export const pagedProjectsManager = new PagedProjectsManager()
