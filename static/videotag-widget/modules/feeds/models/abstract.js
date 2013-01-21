/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Model.extend({
        'urlRoot': require.appConfig.feedsApiUrl + '/event/',
        'setMetaData': function (key, value) {
            var metadata = this.getMetaData();
            metadata[key] = value;

            this.set('metadata', JSON.stringify(metadata));
        },
        'getMetaData': function (key) {
            if (key) {
                return JSON.parse(this.get('metadata'))[key];
            } else {
                return JSON.parse(this.get('metadata'));
            }
        },
        'unsetMetaData': function (key) {
            var metadata = this.getMetaData();
            delete metadata[key];

            this.set('metadata', JSON.stringify(metadata));
        },
    });
});
