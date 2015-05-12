/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.BadgeSession = Backbone.View.extend({

        template: JST['app/scripts/templates/BadgeSession.ejs'],

        tagName: 'li',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            var vars = this.model.toJSON()
            vars.url = App.host + '/user'
            this.$el.html(this.template(vars));
        }

    });

})();
