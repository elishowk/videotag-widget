/*global define*/

require.config({
    'baseUrl': require.appConfig.baseUrl,
    'paths': {
        'domready':     'lib/require-domready-2.0.1.min',
        'i18n':         'lib/require-i18n-2.0.1.min',
        'noext':        'lib/require-noext-0.3.1.min',
        'backbone':     'lib/backbone-0.9.9.min',
        'jquery':       'lib/jquery-1.8.3.min',
        'underscore':   'lib/lodash-1.0.0.min',
        'setimmediate': 'lib/setimmediate-1.0.1.min',
        'root':         'videotag-widget',
        'app':          'videotag-widget/app',
        'modules':      'videotag-widget/modules',
    },
    'shim': {
        'app': {
            'deps': ['setimmediate']
        },
        'backbone': {
            'deps': [
                'underscore',
                'jquery'
            ],
            'exports': 'Backbone'
        },
        'youtube-player-api': {
            'exports': 'YT'
        },
    },
});

define([
    'app',
    'poser/backbone-tastypie-0.1'
], function (App) {
    'use strict';

    App.on('ready', function () {
        $(document.body).append(App.view.$el);
        console.log('APP LOADED');
    });
    App.initialize();
});
