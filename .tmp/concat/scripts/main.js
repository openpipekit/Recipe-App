/*global App, $*/

window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict'
    // Host overrrides for Development
    //// Static API
    //App.host = "http://localhost:9000"
    //// Local Drupal
    App.host = "http://local.madlibrobots.com"
    console.log('Hello from Backbone!')
    var router = new App.Routers.Main()
    Backbone.history.start()
  },
  host: 'http://dev-mad-lib-robots.pantheon.io'
}

$(document).ready(function () {
  'use strict'

  var proxiedSync = Backbone.sync
  Backbone.sync = function(method, model, options) {
    options || (options = {})
    if (!options.crossDomain) {
      options.crossDomain = true
      options.dataType = 'text'
    }
    return proxiedSync(method, model, options)
  }

  App.init();
})

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/RecipeForm.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<p>Your content here.</p>\n\n';

}
return __p
};

this["JST"]["app/scripts/templates/recipe.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>' +
((__t = ( title )) == null ? '' : __t) +
' <a class="edit" href="#recipe/' +
((__t = ( nid )) == null ? '' : __t) +
'/edit">(edit)</a> </h1>\n\n<p class="lead statement">\n  ' +
((__t = ( field_statement )) == null ? '' : __t) +
'\n</p>\n\n<div class="recipe">\n  <div class="form-group">\n    <textarea class="form-control" rows="3" id="recipe" readonly>' +
((__t = ( field_code )) == null ? '' : __t) +
'</textarea>\n  </div>\n  <h3> Read Me </h3>\n  <blockquote class="install-instructions">\n    <p> ' +
((__t = ( field_readme )) == null ? '' : __t) +
' </p>\n  </blockquote>\n\n</div>\n';

}
return __p
};
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
            var tokens = (this.model.get('field_statement')).split(' ')
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
          $('textarea').text(Mustache.render(this.model.get('field_code'), vars))
        },

        edit: function() {
          Backbone.history.navigate('/recipe/' + this.model.id + '/edit', {trigger: true})
        }

    });

})();

/*global App, Backbone*/

App.Routers = App.Routers || {};

(function () {
    'use strict';

    App.Routers.Main = Backbone.Router.extend({

      routes: {
        'recipe/add': 'recipeAdd',
        'recipe/:id/edit': 'recipeEdit',
        'recipe/:id': 'recipe',
        'add': 'add'
      },

      recipe: function(id) {
        App.recipe = new App.Models.Recipe({nid: id})
        App.recipeView = new App.Views.Recipe({model: App.recipe})
        $('.main').html(App.recipeView.el)
        App.recipeView.render()
      },

      recipeAdd: function() {
        App.recipeForm = new App.Views.RecipeForm({
          model: new App.Models.Recipe()
        })
        App.recipeForm.render()
        App.recipeForm.once('done', function() {
          Backbone.history.navigate('recipe/' + App.recipeForm.model.id, {trigger: true})
        }, this)
        $('.main').html(App.recipeForm.el)
      },
      recipeEdit: function(id) {
        var recipe = new App.Models.Recipe({nid: id})
        recipe.once('sync', function() {
          App.recipeForm = new App.Views.RecipeForm({
            model: recipe
          })
          App.recipeForm.render()
          App.recipeForm.once('done', function() {
            Backbone.history.navigate('recipe/' + App.recipeForm.model.id, {trigger: true})
          }, this)
          $('.main').html(App.recipeForm.el)
        })
        recipe.fetch()
      }


    });

})();

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
