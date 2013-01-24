
/*global define, _*/

define([
    'backbone',
    'lib/raven-0.6.min'
], function (
    Backbone
) {
    'use strict';

    var Config = _.extend({
        'initialize': function () {
            require([
                'videotag/page/model'
            ], function (
                Page
            ) {
                this.once('dataLoaded', function () {
                    this.trigger('ready');
                }, this);
                this.page = new Page({'id': require.appConfig.pageId});
                var that= this;
                this.page.fetch({
                    success: function(model, response, options) {
                        that.trigger('dataLoaded');
                    },
                    error: function(model, xhr, options) {
                        // TODO
                    }
                });
                return this;
            }.bind(this));
        },
        getVideoId: function() {
            return parseUri(this.page.get('video'))['queryKey']['v'];
        },
    }, Backbone.Events);
    return Config;
});
