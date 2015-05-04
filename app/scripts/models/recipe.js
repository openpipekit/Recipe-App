/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Recipe = Backbone.Model.extend({

        url: function() {
          return '/api/recipes/' + this.id + '.json'
        },

        initialize: function() {
        },

        defaults: {
          'authorId': '',
          'statement': '',
          'recipe': '',
          'bakingInstructions': '',
          'installInstructions':'',
          'muffin': ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {

            return JSON.parse(response);
        }
    });

})();
