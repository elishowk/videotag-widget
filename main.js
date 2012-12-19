/*global define*/

require.config({
  'baseUrl': require.customConfig.baseUrl,
  'paths': {
    'domready': 'lib/require-domready-2.0.1.min',
    'text':     'lib/require-text-2.0.3.min',
    'i18n':     'lib/require-i18n-2.0.1.min',
    'backbone': 'lib/backbone-0.9.9.min',
    'jquery':   'lib/jquery-1.8.3.min',
    'lodash':   'lib/lodash-1.0.0.min',
    'app':      'videotag-widget/app',
    'modules':  'videotag-widget/modules',
  },
  'shim': {
    'app': {
      'deps': ['backbone']
    },
    'backbone': {
      'deps': [
        'lodash',
        'jquery'
      ],
    },
    'jquery.scrolltofixed': {
      'deps': ['jquery']
    },
  }
});

define(['app'], function (App) {
  App.initialize();
});