var html = require('choo/html')
var { emit } = require('choo-shortemit')
var toolbar = require('./toolbar')

module.exports = inspector

function inspector (componentRenderer, selected) {
  var el = selected ? renderComponent() : message('← Select a component to inspect.')
  return html`
    <div class="p1 1 pr">
      ${el}
      ${selected && toolbar(selected, el)}
    </div>
  `

  function renderComponent () {
    // Use render as the default method of the wrapper
    if (typeof componentRenderer !== 'function') {
      if (typeof componentRenderer.render === 'function') {
        componentRenderer = componentRenderer.render
      } else {
        return message('The component or the wrapper is not exported correctly.')
      }
    }

    return componentRenderer()
  }

  function message (string) {
    return html`
      <div class="dx center h100">
        <div class="f1">${string}</div>
      </div>
    `
  }
}
