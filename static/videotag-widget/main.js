/*global define*/

require.config({
    'baseUrl': require.appConfig.baseUrl,
    'paths': {
        'domready':     'lib/require-domready-2.0.1.min',
        'i18n':         'lib/require-i18n-2.0.1.min',
        'noext':        'lib/require-noext-0.3.1.min',
        'backbone':     'lib/backbone-0.9.9.min',
        'app':          'videotag-widget/app',
        'modules':      'videotag-widget/modules',
    },
    'shim': {
        'backbone': {
            'deps': [
                'lib/lodash-1.0.0.min',
                'lib/jquery-1.8.3.min',
            ],
            'exports': 'Backbone'
        },
        'youtube-player-api': {
            'exports': 'YT'
        },
        'dailymotion-player-api': {
            'exports': 'DM'
        },
        'app': {
            'deps': [
                'poser/backbone-tastypie-0.1',
                'lib/setimmediate-1.0.1.min'
            ]
        }
    }
});

define([
    'app',
    'modules/config/main'
], function (App, Config) {
    'use strict';

    var config = new Config();

    // getting the csrf token (django === ugly)
    $('<iframe style="display: none">')
        .on('load', function () {
            App.on('ready', function () {
                $(document.body).append(App.view.$el);
                console.log('APP READY');
            });
            config.on('ready', function () {
                App.config = config.data;
                App.initialize();
            });
            config.initialize()
        })
        .attr('src', window.location.origin)
        .appendTo(document.body)
});
