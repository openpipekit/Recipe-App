window.App={Models:{},Collections:{},Views:{},Routers:{},init:function(){"use strict";new App.Routers.Main;Backbone.history.start()},host:"http://dev-mad-lib-robots.pantheon.io"},$(document).ready(function(){"use strict";var a=Backbone.sync;Backbone.sync=function(b,c,d){return d||(d={}),d.crossDomain||(d.crossDomain=!0,d.dataType="text"),a(b,c,d)},App.init()}),this.JST=this.JST||{},this.JST["app/scripts/templates/RecipeForm.ejs"]=function(obj){obj||(obj={});var __p="";_.escape;with(obj)__p+="<p>Your content here.</p>\n\n";return __p},this.JST["app/scripts/templates/RecipeItem.ejs"]=function(obj){obj||(obj={});var __t,__p="";_.escape;with(obj)__p+='<p><a href="#recipe/'+(null==(__t=nid)?"":__t)+'">'+(null==(__t=title)?"":__t)+"</a>: "+(null==(__t=field_statement)?"":__t)+"</p>\n";return __p},this.JST["app/scripts/templates/recipe.ejs"]=function(obj){obj||(obj={});var __t,__p="";_.escape;with(obj)__p+="<h1>"+(null==(__t=title)?"":__t)+' <a class="edit" href="#recipe/'+(null==(__t=nid)?"":__t)+'/edit">(edit)</a> </h1>\n\n<p class="lead statement">\n  '+(null==(__t=field_statement)?"":__t)+'\n</p>\n\n<div class="recipe">\n  <div class="form-group">\n    <textarea class="form-control" rows="3" id="recipe" readonly>'+(null==(__t=field_code)?"":__t)+'</textarea>\n  </div>\n  <h3> Read Me </h3>\n  <blockquote class="install-instructions">\n    <p> '+(null==(__t=field_readme)?"":__t)+" </p>\n  </blockquote>\n\n</div>\n";return __p},this.JST["app/scripts/templates/recipes.ejs"]=function(obj){obj||(obj={});var __p="";_.escape;with(obj)__p+="<p>Your content here.</p>\n\n";return __p},App.Models=App.Models||{},function(){"use strict";App.Models.Recipe=Backbone.Model.extend({idAttribute:"nid",url:function(){return App.host+"/api/recipe/"+this.id},initialize:function(){},defaults:{field_statement:"",field_code:"",field_readme:"",field_tags:[]},schema:{field_statement:"TextArea",field_code:"TextArea",field_readme:"TextArea",field_tags:{type:"Text",help:"A comma delimited list of tags."}},validate:function(a,b){},parse:function(a,b){if(_.isObject(a))return a;var c=JSON.parse(a);return _.isArray(c.field_statement)&&(c.field_statement=c.field_statement.join("\n")),_.isArray(c.field_code)&&(c.field_code=c.field_code.join("\n")),_.isArray(c.field_readme)&&(c.field_readme=c.field_readme.join("\n")),c},getIngredients:function(){var a=[],b=this.get("recipe").match(/{{(.*?)}}/g);return b.forEach(function(b){b=b.substr(2,b.length),b=b.substr(0,b.length-2),a.push(b)}),a}})}(),App.Views=App.Views||{},function(){"use strict";App.Views.Recipe=Backbone.View.extend({template:JST["app/scripts/templates/recipe.ejs"],tagName:"form",className:"recipe",events:{"click .edit":"edit",keyup:"bake"},initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){this.model.on("sync",function(){var a=this.model.toJSON();a.field_statement=this.getHtmlStatement(),this.$el.html(this.template(a)),autosize(this.$el.find("textarea")),this.$el.find(".input").each(function(){$(this).css("min-width",$(this).width()+"px"),$(this).one("click",function(){$(this).text("")})})},this),this.model.fetch({dataType:"text"})},getHtmlStatement:function(){var a="",b=this.model.get("field_statement").split(" ");return b.forEach(function(b){if("{{"==b.substr(0,2)){var c=b.substr(2,b.length);c=c.substr(0,c.length-2),a+='<span style="display: inline-block; padding: 5px;border: 1px solid #ccc; border-radius: 4px;" class="input" data-name="'+c+'" contentEditable=true> '+b+"</span> "}else a+=b+" "}),a},bake:function(){console.log("Baking.");var a={};this.$el.find(".input").each(function(b){a[$(this).attr("data-name")]=$(this).text()}),$("textarea").text(Mustache.render(this.model.get("field_code"),a))},edit:function(){Backbone.history.navigate("/recipe/"+this.model.id+"/edit",{trigger:!0})}})}(),App.Routers=App.Routers||{},function(){"use strict";App.Routers.Main=Backbone.Router.extend({routes:{"recipe/add":"recipeAdd","recipe/:id/edit":"recipeEdit","recipe/:id":"recipe",search:"search"},recipe:function(a){App.recipe=new App.Models.Recipe({nid:a}),App.recipeView=new App.Views.Recipe({model:App.recipe}),$(".main").html(App.recipeView.el),App.recipeView.render()},recipeAdd:function(){App.recipeForm=new App.Views.RecipeForm({model:new App.Models.Recipe}),App.recipeForm.render(),App.recipeForm.once("done",function(){Backbone.history.navigate("recipe/"+App.recipeForm.model.id,{trigger:!0})},this),$(".main").html(App.recipeForm.el)},recipeEdit:function(a){var b=new App.Models.Recipe({nid:a});b.once("sync",function(){App.recipeForm=new App.Views.RecipeForm({model:b}),App.recipeForm.render(),App.recipeForm.once("done",function(){Backbone.history.navigate("recipe/"+App.recipeForm.model.id,{trigger:!0})},this),$(".main").html(App.recipeForm.el)}),b.fetch()},search:function(){var a=new App.Collections.Recipes,b=new App.Views.Recipes({collection:a});$(".main").html(b.el),b.render()}})}(),App.Views=App.Views||{},function(){"use strict";App.Views.RecipeForm=Backbone.View.extend({className:"recipe-form",events:{"click .submit":"submit"},render:function(){this.form=new Backbone.Form({model:this.model,submitButton:"save"}),this.form.on("submit",function(a){a.preventDefault(),this.submit()},this),this.form.render(),this.$el.append(this.form.el)},submit:function(){this.form.commit(),this.model.on("sync",function(){this.trigger("done")},this),this.model.save()}})}(),App.Views=App.Views||{},function(){"use strict";App.Views.Recipes=Backbone.View.extend({template:JST["app/scripts/templates/recipes.ejs"],tagName:"div",id:"",className:"",collection:App.Collections.Recipes,events:{},initialize:function(){this.listenTo(this.collection,"change",this.render)},render:function(){var a=this;this.collection.once("sync",function(){this.models.forEach(function(b){var c=new App.Views.RecipeItem({model:b});a.$el.append(c.el),c.render()})}),this.collection.fetch()}})}(),App.Views=App.Views||{},function(){"use strict";App.Views.RecipeItem=Backbone.View.extend({template:JST["app/scripts/templates/RecipeItem.ejs"],tagName:"div",id:"",className:"",events:{},initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){this.$el.html(this.template(this.model.toJSON()))}})}(),App.Collections=App.Collections||{},function(){"use strict";App.Collections.Recipes=Backbone.Collection.extend({url:function(){return App.host+"/api/query/recipes"},model:App.Models.Recipe,parse:function(a){var b=JSON.parse(a);return b}})}();