var test = require('tape')

module.exports = tests

function tests (state, emitter) {
  state.events.TEST = 'nanoconstruct:test'

  emitter.on(state.events.TEST, (componentName, el) => {
    var component = state.nanoconstruct.components[componentName]

    if (component && typeof component.test === 'function') {
      run(componentName, el, component.test)
    }
  })

  function run (name, el, testFunction) {
    var success = []
    var failure = []

    var resetLog = mockLog(function (line) {
      if (line.indexOf('ok') === 0) {
        success.push(line.replace('ok ', ''))
      } else if (line.indexOf('not ok') === 0) {
        failure.push(line.replace('not ok ', ''))
      }
    })

    test(name, (t) => {
      testFunction(t, el)
    })

    test.onFinish(function () {
      resetLog()

      failure.map(txt => {
        console.log('FAIL: ' + txt)
      })
    })
  }
}

function mockLog (handler, pass) {
  var _olog = console.log

  console.log = function () {
    handler(...arguments)
    if (pass) _olog.bind(console, arguments)
  }

  return function () {
    console.log = _olog
  }
}
