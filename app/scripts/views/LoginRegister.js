/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.LoginRegister = Backbone.View.extend({

        template: JST['app/scripts/templates/LoginRegister.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
          'click .btn': 'submit'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
        },

        submit: function() {
          var mail = this.$el.find('input').val()
          this.model.set('mail', mail)
          this.model.once('sync', function() {
            this.$el.html('<h2>Check your email for a link that will log you in.</h2>')
          }, this)
          this.model.save()
        }

    });

})();
