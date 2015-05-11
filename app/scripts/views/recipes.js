/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Recipes = Backbone.View.extend({

        template: JST['app/scripts/templates/recipes.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        collection: App.Collections.Recipes,

        events: {},

        initialize: function () {
          this.listenTo(this.collection, 'change', this.render);
        },

        render: function () {
          var view = this
          this.collection.once('sync', function() {
            this.models.forEach(function(model) {
              var itemView = new App.Views.RecipeItem({model: model})
              view.$el.append(itemView.el)
              itemView.render()
            })
          })
          this.collection.fetch()
        }

    });

})();
