/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.LoginRegister = Backbone.Model.extend({

        url: function() {
          return App.host + '/api/user/token/request'
        },

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
          //response = JSON.parse(response)
          return {}
        }
    });

})();
