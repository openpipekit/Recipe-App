/*global App, $*/

window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict'
    // Host overrrides for Development
    //// Static API
    //App.host = "http://localhost:9000"
    //// Local Drupal
    //App.host = "http://local.madlibrobots.com"
    App.user = new App.Models.WhoAmI()
    var router = new App.Routers.Main()
    var badgeView = new App.Views.Badge({model: App.user})
    $('.header').prepend(badgeView.el)
    badgeView.render()
    Backbone.history.start()
  },
  host: 'http://dev-mad-lib-robots.pantheon.io'
}

$(document).ready(function () {
  'use strict'

  var proxiedSync = Backbone.sync
  Backbone.sync = function(method, model, options) {
    options || (options = {})
    if (!options.crossDomain) {
      options.crossDomain = true
      options.dataType = 'text'
    }
    if (!options.xhrFields) {
      options.xhrFields = {withCredentials:true};
    }
    return proxiedSync(method, model, options)
  }

  App.init();
})
