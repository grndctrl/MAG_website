import './css/style.css'

import 'zenscroll'

import { core } from './js/core'
import { header, nav, footer, barbaManager } from './js/layout'
import { images, scrollAnchors, expander, cursorBekijk, slider, sliderMobile, ajaxModule, lazyloader, truncateManager, pagedProjectsManager } from './js/components'
import { animFadeIn, animMoveIn, animSvgIn, animHeroSvgIn } from './js/animations'

(function () {
  core.attach(header, { element: document.querySelector('.header-main') })
  core.attach(nav, { element: document.querySelector('.nav-main') })
  core.attach(footer, { element: document.querySelector('.footer-main') })
  core.attach(barbaManager)

  core.attach(images, {}, true)
  core.attach(scrollAnchors, {}, true)
  core.attach(expander, {}, true)
  core.attach(cursorBekijk, {}, true)
  core.attach(slider, {}, true)
  core.attach(sliderMobile, {}, true)
  core.attach(ajaxModule, { target: '.ajax-load-more' }, true)
  core.attach(lazyloader, { target: '.lazy' }, true)
  core.attach(truncateManager, {}, true)
  core.attach(pagedProjectsManager, {}, true)

  core.attach(animFadeIn, { target: '.anim-fade-in' }, true)
  core.attach(animMoveIn, { target: '.anim-move-in' }, true)
  core.attach(animSvgIn, { target: '.anim-svg-in' }, true)
  core.attach(animHeroSvgIn, {}, true)

  core.init()
})()
