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
            var results = JSON.parse(response);
            results.recipe = results.recipe.join('\n')
            return results
        },

        getIngredients: function() {
          var ingredients = []
          var tokens = (this.get('recipe')).match(/{{(.*?)}}/g)
          tokens.forEach(function(token) {
            token = token.substr(2, token.length)
            token = token.substr(0, token.length-2)
            ingredients.push(token)
          })
          return ingredients

        }
    });

})();
