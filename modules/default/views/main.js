/*global define*/

define(['backbone'], function (Backbone) {
  'use strict';

  return new (Backbone.View.extend({
    'id': 'main',
    'tagName': 'div',
    'render': function (content, empty) {
      if (content instanceof Backbone.View) {
        content = content.$el;
      }

      if (empty) {
        this.$el.empty();
      }

      this.$el
        .append(content);

      return this;
    },
  }))();
});
