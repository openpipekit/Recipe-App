/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Badge = Backbone.View.extend({

        tagName: 'ul',

        id: '',

        template: JST['app/scripts/templates/Badge.ejs'],

        className: 'nav nav-pills pull-right',

        events: {},

        initialize: function () {
          this.$el.hide()
          this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
          this.$el.html(this.template())
          if (this.model.get('uid') == 0) {
            var badgeAnonymous = new App.Views.BadgeAnonymous({model: this.model})
            this.$el.append(badgeAnonymous.el)
            badgeAnonymous.render()
          }
          else {
            var badgeSession = new App.Views.BadgeSession({model: this.model})
            this.$el.append(badgeSession.el)
            badgeSession.render()
          }
          this.$el.fadeIn()
        }

    });

})();
