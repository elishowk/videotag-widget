/*global define, _*/

define([
  'backbone',
  'text!modules/ticker/templates/main.tpl'
], function (Backbone, tpl) {
  'use strict';

  return Backbone.View.extend({
    'className': 'ticker',
    'tagName': 'div',
    'render': function () {
      this.$el.html(_.template(tpl));

      return this;
    }
  });
});
