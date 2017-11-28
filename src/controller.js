import * as templates from './templates.js'
import * as util    from './util.js'

const routes = {
  front: async () => {
    return templates.exampleTemplate(await util.fetchJson('http://echo.jsontest.com/key/go_to_another_route/link/another'))
  },
  another: async () => {
    let json = {
      text: "Go back to front",
      list: ['This', 'is', 'a', 'list'],
      exists: 'does',
      link: ""
    }
    return templates.anotherExampleTemplate(json)
  }
}

export class Controller {
  constructor(element) {
    this.routes   = routes
    this.element  = element
    window.onhashchange = this.fragmentChanged.bind(this)
    this.fragmentChanged()
  }

  async fragmentChanged() {
    const viewName = util.urlHashParse(window.location.hash.substr(1))
    const arg      = util.urlArgParse(window.location.hash.substr(1))

    this.element.innerHTML = ''
  
    if (this.routes[viewName]) {
      this.element.innerHTML = util.renderTemplate(await this.routes[viewName](arg))
    } else {
      this.element.innerHTML = util.renderTemplate(await this.routes.front(arg))
    }
  }
}
