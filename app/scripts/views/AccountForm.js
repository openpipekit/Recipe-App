/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.AccountForm = Backbone.View.extend({

        template: JST['app/scripts/templates/AccountForm.ejs'],

        tagName: 'div',

        className: '',

        events: {
          'click button': 'submit'
        },

        initialize: function () {
          this.$el.hide()
          this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
          this.form = new Backbone.Form({model: this.model, submitButton: "save"})
          this.form.render()
          this.$el.html(this.form.el)
          this.$el.fadeIn()
        },

        submit: function(e) {
          e.preventDefault()
          this.form.commit()
          this.model.save()
        }

    });

})();
