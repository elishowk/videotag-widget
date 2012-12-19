/*global define*/

define(function () {
  'use strict';

  return new (Backbone.View.extend({
    'id': 'main',
    'tagName': 'div',
    'render': function (content) {
      if (content instanceof Backbone.View) {
        content = content.$el;
      }

      this.$el
        .empty()
        .append(content);

      return this;
    }
  }));
});
