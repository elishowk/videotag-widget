/*global define*/

define([
  'backbone',
], function (Backbone) {
  return Backbone.View.extend({
    'className': 'player',
    'tagName': 'div',
    'initialize': function (el, type) {
      this.setElement(el);
      this.$el.addClass('type-' + type);
    },
    'render': function () {
      return this;
    }
  });
});
