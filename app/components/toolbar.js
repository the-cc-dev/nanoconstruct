var html = require('choo/html')
var { emit } = require('choo-shortemit')
var { getEvents } = require('../stores/events-shortcut')

module.exports = toolbar

function toolbar (selected, el) {
  return html`
    <div class="pa l0 b0 p0-5 bt 1 nano">
      <a onclick="${runTest}" href="#" class="f6 tcblack">TEST</a>
    </div>
  `

  function runTest (e) {
    e.preventDefault()
    emit(getEvents().TEST, selected, el)
  }
}
