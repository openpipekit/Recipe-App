/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Account = Backbone.Model.extend({

        idAttribute: 'uid',

        url: function(){
          return App.host + '/api/user/account/' + this.id
        },

        initialize: function() {
        },

        defaults: {
        },

        schema: {
          name: 'Text'
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            response = JSON.parse(response)
            return response;
        }
    });

})();
