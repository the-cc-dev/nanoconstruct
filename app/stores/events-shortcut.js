var createShortcut = require('choo-shortcut')

var shortcut = createShortcut(function (state, emitter) {
  return state.events
})

module.exports = shortcut.set
module.exports.getEvents = shortcut.get
