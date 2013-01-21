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
            App.mediator.emit('feeds::message::user::' + model.get('created_by'), model, model.get('created_by'));
        });
        // TODO move in ticker
        App.mediator.on('feeds::message::new', function (data) {
            // Do *NOT* use Backbone.Collection.create
            var model = new this.messages.model({
                'action': 'message.self',
                'feed': require.appConfig.feedId,
                'reference': data.reference + '',
                'metadata': JSON.stringify({
                    'text': data.text
                })
            });
            // TODO model.save({'success': function () {
            //    this.messages.add(model);
            //}.bind(this)})
            model.save();
        }, this);

        /**
         * Users
         */
        this.users = new UserCollection();
    };

    return DataMap;
});
