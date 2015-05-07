/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Recipe = Backbone.View.extend({

        template: JST['app/scripts/templates/recipe.ejs'],

        tagName: 'form',

        className: 'recipe',

        events: {
          'click button': 'bake',
          'keyup': 'bake'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.model.on('sync', function() {
                var vars = this.model.toJSON()
                vars.statement = this.getHtmlStatement()
                this.$el.html(this.template(vars));
                autosize(this.$el.find('textarea'))
                this.$el.find('input').each(function(){
                  $(this).keyup(function(){
                    var size = parseInt($(this).attr('size'));
                    var chars = $(this).val().length;
                    if(chars >= size) $(this).attr('size', chars);
                  })
                });
            }, this)
            this.model.fetch({dataType: 'text'})
        },

        getHtmlStatement: function() {
            var results = ''
            var tokens = (this.model.get('statement')).split(' ')
            tokens.forEach(function(token) {
              if (token.substr(0, 2) == '{{') {
                var name = (token.substr(2, token.length))
                name = name.substr(0, name.length-2)
                results += '<input class="form-control" style="width: auto; display: inline;" placeholder="' + token + '" data-name="' + name + '" size=' + token.length + '></input> '
              }
              else {
                results += token + ' '
              }
            })
            return results
        },

        bake: function() {
          console.log('Baking.')
          var vars = {}
          $('input').each(function($el) {
            vars[$(this).attr('data-name')] = $(this).val()
          })
          $('textarea').text(Mustache.render(this.model.get('recipe'), vars))
        }

    });

})();
