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
                this.$el.find('.input').each(function(){
                  $(this).css('min-width', $(this).width() + 'px')
                  //debugger
                  $(this).one('click', function() {
                    $(this).text('')
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
                results += '<span style="display: inline-block; padding: 5px;border: 1px solid #ccc; border-radius: 4px;" class="input" data-name="' + name + '" contentEditable=true> ' + token + '</span> '
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
          this.$el.find('.input').each(function($el) {
            vars[$(this).attr('data-name')] = $(this).text()
          })
          $('textarea').text(Mustache.render(this.model.get('recipe'), vars))
        }

    });

})();
