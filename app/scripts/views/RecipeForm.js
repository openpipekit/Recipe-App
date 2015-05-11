/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.RecipeForm = Backbone.View.extend({

        className: 'recipe-form',

        events: {
          'click .submit': 'submit'
        },

        render: function () {
          this.form = new Backbone.Form({model: this.model, submitButton: "save"})
          this.form.on('submit', function(e) {
            e.preventDefault()
            this.submit()
          }, this)
          this.form.render()
          this.$el.append(this.form.el)
        },

        submit: function() {
          this.form.commit()
          this.model.on('sync', function() {
            this.trigger('done')
          }, this)
          this.model.save()
        }

    });

})();
