/*global App, Backbone*/

App.Routers = App.Routers || {};

(function () {
    'use strict';

    App.Routers.Main = Backbone.Router.extend({

      routes: {
        'recipe/:id': 'recipe'
      },

      recipe: function(id) {
        var recipe = new App.Models.Recipe({id: id})
        var recipeView = new App.Views.Recipe({model: recipe})
        $('.main').html(recipeView.el)
        recipeView.render()
      }

    });

})();
