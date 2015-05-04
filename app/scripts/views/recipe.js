/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Recipe = Backbone.View.extend({

        template: JST['app/scripts/templates/recipe.ejs'],

        tagName: 'div',

        className: 'recipe',

        events: {
          'click button': 'bake'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.model.on('sync', function() {
                var vars = this.model.toJSON()
                vars.ingredients = this.model.getIngredients()
                this.$el.html(this.template(vars));
            }, this)
            this.model.fetch({dataType: 'text'})
        },

        bake: function() {
          var ingredients = []
          console.log('Baking...')
          var $inputs = this.$el.find('input')
          $inputs.each(function(key, $input) {
            ingredients[$($input).attr('id')] = $($input).val()
          })
          var muffin = Mustache.render(this.model.get('recipe'), ingredients)
          this.$el.find('.muffin input').val(muffin)
          return muffin
        }

    });

})();
