/*global App, Backbone, JST*/

App.Views = App.Views || {};

(function () {
    'use strict';

    App.Views.Recipe = Backbone.View.extend({

        template: JST['app/scripts/templates/recipe.ejs'],

        tagName: 'form',

        className: 'recipe',

        events: {
          'click .edit': 'edit',
          'keyup': 'bake'
        },

        initialize: function () {
          this.$el.hide()
          this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.model.on('sync', function() {
                var vars = this.model.toJSON()
                vars.field_statement = this.getHtmlStatement()
                this.$el.html(this.template(vars));
                autosize(this.$el.find('textarea'))
                this.$el.find('.input').each(function(){
                  $(this).css('min-width', $(this).width() + 'px')
                  $(this).one('click', function() {
                    $(this).text('')
                  })
                });
                this.$el.fadeIn()
            }, this)
            this.model.fetch({dataType: 'text'})
        },

        getHtmlStatement: function() {
            var statement = this.model.get('field_statement')
            var tokens = []
            var findToken = function(statement) {
                var a = statement.indexOf('{{')
                var b = statement.indexOf('}}')
                tokens.push(statement.substr(a,b-a+2))
                statement = statement.substr(b+2, statement.length)
                if (statement.indexOf('{{') !== -1) {
                    findToken(statement)
                }
            }
            if (statement.indexOf('{{') !== -1) {
              findToken(statement)
            }
            var statement = this.model.get('field_statement')
            tokens.forEach(function(token) {
                var $el = '<span style="display: inline-block; padding: 5px;border: 1px solid #ccc; border-radius: 4px;" class="input" data-name="' + token + '" contentEditable=true>' + token + '</span> '
                statement = statement.replace(token, $el)
            })
            return statement
        },

        bake: function() {
          console.log('Baking.')
          var tokens = []
          this.$el.find('.input').each(function($el) {
            tokens.push([$(this).attr('data-name'), $(this).text()])
          })
          var code = this.model.get('field_code')
          tokens.forEach(function(token) {
            code = code.replace(token[0], token[1])
          })

          $('textarea').text(code)
        },

        edit: function() {
          Backbone.history.navigate('/recipe/' + this.model.id + '/edit', {trigger: true})
        }

    });

})();
