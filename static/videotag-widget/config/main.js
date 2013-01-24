
/*global define, _*/

define([
    'backbone'
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
        }
    }, Backbone.Events);
    return Config;
});
