/*global define, _*/

define([
    'backbone'
], function (
    Backbone
) {
    'use strict';

    var Config = function () {};

    _.extend(Config.prototype, {
        'data': {
            'csrftoken': $('input[name=csrfmiddlewaretoken]').attr('value')
        },
        'initialize': function () {
            this.data = _.defaults(require.appConfig, this.data);
            $.ajax({
                'url': this.data.poserApiUrl + '/page/' + this.data.pageId,
                'type': 'GET',
                'contentType': 'application/json',
                'success': function (result) {
                    this.data.page = result;
                    this.trigger('ready');
                }.bind(this)
            });

            return this;
        }
    }, Backbone.Events);

    return Config;
});
