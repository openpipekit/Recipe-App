/*global App, Backbone*/

App.Routers = App.Routers || {};

(function () {
    'use strict';

    App.Routers.Main = Backbone.Router.extend({

      routes: {
        'recipe/:id': 'recipe'
      },

      recipe: function(id) {
        App.recipe = new App.Models.Recipe({id: id})
        App.recipeView = new App.Views.Recipe({model: App.recipe})
        $('.main').html(App.recipeView.el)
        App.recipeView.render()
      }

    });

})();
