/*global App, $*/

window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict'
    console.log('Hello from Backbone!')
    var router = new App.Routers.Main()
    Backbone.history.start()
  }
}

$(document).ready(function () {
  'use strict'
  var proxiedSync = Backbone.sync
  Backbone.sync = function(method, model, options) {
    options || (options = {})
    if (!options.crossDomain) {
      options.crossDomain = true
    }
    return proxiedSync(method, model, options)
  }
  App.init();
})
