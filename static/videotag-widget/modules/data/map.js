/*global define*/

define([
    'videotag/user/collection',
    'modules/feeds/collections/message',
], function (
    UserCollection,
    FeedsCollectionsMessage
) {
    'use strict';

    var DataMap = function () {};

    DataMap.prototype.initialize = function () {
        /**
         * Messages
         */
        this.messages = new FeedsCollectionsMessage(null, {'feedId': require.appConfig.feedId});
        this.messages.on('add', function (model) {
            App.mediator.emit('datamap::messages::create::' + model.get('created_by'), model, model.get('created_by'));
        });
        this.messages.on('remove', function (model) {
            App.mediator.emit('datamap::messages::remove::' + model.get('created_by'), model, model.get('created_by'));
        });

        /**
         * Users
         */
        this.users = new UserCollection();
    };

    return DataMap;
});
