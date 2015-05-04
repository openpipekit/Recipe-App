/*global App, $*/


window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
        var router = new App.Routers.Main()
        Backbone.history.start()
    }
};

$(document).ready(function () {
    'use strict';
    App.init();
});
