/*global App, Backbone*/

App.Models = App.Models || {};

(function () {
    'use strict';

    App.Models.Recipe = Backbone.Model.extend({

      idAttribute: 'nid',

      url: function() {
        return App.host + '/api/recipe/' + this.id
      },

      initialize: function() {
      },

      defaults: {
        'field_statement': '',
        'field_code': '',
        'field_readme':'',
        'field_tags': []
      },

      schema: {
        'field_statement': 'TextArea',
        'field_code': 'TextArea',
        'field_readme':'TextArea',
        'field_tags': {'type': 'Text', 'help':'A comma delimited list of tags.'}
      },

      validate: function(attrs, options) {
      },

      parse: function(response, options)  {
        // Static API support for multiline strings
        var results = JSON.parse(response);
        if (_.isArray(results.field_statement)) {
          results.field_statement = results.field_statement.join('\n')
        }
        if (_.isArray(results.field_code)) {
          results.field_code = results.field_code.join('\n')
        }
        if (_.isArray(results.field_readme)) {
          results.field_readme = results.field_readme.join('\n')
        }
        return results
      },

      getIngredients: function() {
        var ingredients = []
        var tokens = (this.get('recipe')).match(/{{(.*?)}}/g)
        tokens.forEach(function(token) {
          token = token.substr(2, token.length)
          token = token.substr(0, token.length-2)
          ingredients.push(token)
        })
        return ingredients

      }
    });

})();
