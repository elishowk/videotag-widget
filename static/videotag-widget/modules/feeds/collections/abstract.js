/*global define*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.Tastypie.Collection.extend({
        'feedId': null,
        'urlRoot': require.appConfig.feedsApiUrl + '/event/',
        'addById': function (id) {
            var model = new this.model({'id': id});
            model.fetch({'success': function () {
                this.add(model);
            }.bind(this)});
        }
    });
});
