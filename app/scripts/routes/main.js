/*global App, Backbone*/

App.Routers = App.Routers || {};

(function () {
    'use strict';

    App.Routers.Main = Backbone.Router.extend({

      routes: {
        '': 'home',
        'recipe/add': 'recipeAdd',
        'recipe/:id/edit': 'recipeEdit',
        'recipe/:id': 'recipe',
        'search': 'search'
      },

      home: function() {
        Backbone.history.navigate('search', {trigger: true})
      },

      recipe: function(id) {
        App.recipe = new App.Models.Recipe({nid: id})
        App.recipeView = new App.Views.Recipe({model: App.recipe})
        $('.main').html(App.recipeView.el)
        App.recipeView.render()
      },

      recipeAdd: function() {
        App.recipeForm = new App.Views.RecipeForm({
          model: new App.Models.Recipe()
        })
        App.recipeForm.render()
        App.recipeForm.once('done', function() {
          Backbone.history.navigate('recipe/' + App.recipeForm.model.id, {trigger: true})
        }, this)
        $('.main').html(App.recipeForm.el)
      },

      recipeEdit: function(id) {
        var recipe = new App.Models.Recipe({nid: id})
        recipe.once('sync', function() {
          App.recipeForm = new App.Views.RecipeForm({
            model: recipe
          })
          App.recipeForm.render()
          App.recipeForm.once('done', function() {
            Backbone.history.navigate('recipe/' + App.recipeForm.model.id, {trigger: true})
          }, this)
          $('.main').html(App.recipeForm.el)
        })
        recipe.fetch()
      },

      search: function() {
        var recipes = new App.Collections.Recipes()
        var recipesView = new App.Views.Recipes({collection: recipes})
        $('.main').html(recipesView.el)
        recipesView.render()
      }


    });

})();
