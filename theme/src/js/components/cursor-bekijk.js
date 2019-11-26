import { CoreModule } from '../core'

class CursorBekijk extends CoreModule {
  init() {
    this.wrappers = document.querySelectorAll('.cursor-bekijk-wrapper')

    this.wrappers.forEach(wrapper => {
      wrapper.addEventListener('mouseenter', this.onEnter.bind(wrapper))
      wrapper.addEventListener('mouseleave', this.onLeave.bind(wrapper))
      wrapper.addEventListener('mousemove', this.onMove.bind(wrapper))
    })

    return super.init()
  }

  onEnter() {
    this.classList.add('active')
  }

  onLeave() {
    this.classList.remove('active')
  }

  onMove(event) {
    // var rect = e.target.getBoundingClientRect();
    // var x = e.clientX - rect.left; //x position within the element.
    // var y = e.clientY - rect.top;  //y position within the element.
    let wrapperRect = this.getBoundingClientRect()
    let x = event.clientX - wrapperRect.left + 'px'
    let y = event.clientY - wrapperRect.top + 'px'

    let cursor =this.querySelector('.cursor-bekijk')
    cursor.style.left = x
    cursor.style.top = y
  }

  destroy() {
    this.wrappers.forEach(wrapper => {
      wrapper.removeEventListener('mouseenter', this.onEnter.bind(wrapper))
      wrapper.removeEventListener('mouseleave', this.onLeave.bind(wrapper))
      wrapper.removeEventListener('mousemove', this.onMove.bind(wrapper))
    })

    return super.destroy()
  }
}

export const cursorBekijk = new CursorBekijk()
