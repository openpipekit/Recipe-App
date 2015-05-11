/*global App, Backbone*/

App.Collections = App.Collections || {};

(function () {
    'use strict';

    App.Collections.Recipes = Backbone.Collection.extend({

        url: function() {
          return App.host + '/api/query/recipes'
        },

        model: App.Models.Recipe,

        parse: function(response) {
          var objects = JSON.parse(response)
          return objects
        }

    });

})();
