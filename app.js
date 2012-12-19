/*global define*/

define([
  'mediator/main',
  'modules/default/views/main'
], function (Mediator, DefaultViewsMain) {
  'use strict';

  return {
    'initialize': function () {
      $(document.body).append(DefaultViewsMain.$el);
    },
    'configure': function () {
      // $.ajaxSetup() set CSRF (and API key)
    }
  };
});
