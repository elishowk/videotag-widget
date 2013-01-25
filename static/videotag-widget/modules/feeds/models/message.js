/*global define*/

define(['modules/feeds/models/abstract'], function (FeedsModelsAbstract) {
    'use strict';

    return FeedsModelsAbstract.extend({
        'urlRoot': App.config.feedsApiUrl + '/message/',
        'likeCount': 0,
        'likeUser': false,
        'parse': function (data) {
            if (! data) {
                return data;
            }

            this.likeCount = data['like_count'];
            delete data['like_count'];

            this.likeUser = data['like_user'];
            delete data['like_user'];

            return FeedsModelsAbstract.prototype.parse.call(this, data);
        },
        'initialize': function () {
            var updateLike = function (data) {
                this.likeCount = data['reference'];
                this.trigger('change:like');
            };

            App.mediator.on('feeds::messages::like::' + this.get('id'), updateLike, this);

            this.on('destroy', function () {
                App.mediator.off('feeds::messages::like::' + this.get('id'), updateLike, this);
                // TODO purge likes
            }, this);
        },
        'like': function (options) {
            if (! App.session.isValid()) {
                return App.session.signin();
            }

            if (this.likeUser) {
                $.ajax({
                    'url': App.config.feedsApiUrl + '/like/' + this.likeUser,
                    'type': 'DELETE',
                    'dataType': 'json',
                    'contentType': 'application/json',
                    'success': function () {
                        this.likeUser = false;
                        this.trigger('change:like');
                    }.bind(this)
                });
            } else {
                $.ajax({
                    'url': App.config.feedsApiUrl + '/like/',
                    'type': 'POST',
                    'dataType': 'json',
                    'contentType': 'application/json',
                    'data': JSON.stringify({
                        'action': 'message.like',
                        'feed': App.config.feedId,
                        'parent': this.get('id')
                    }),
                    'success': function (data) {
                        this.likeUser = data.id;
                        this.trigger('change:like');
                    }.bind(this)
                });
            }
        },
        'fetchUser': function (callback) {
            var userModel = App.dataMap.users.get(this.get('created_by'));

            if (userModel instanceof App.dataMap.users.model) {
                return callback(userModel);
            }

            userModel = new App.dataMap.users.model({'id': this.get('created_by')});
            userModel.fetch({'success': function () {
                callback(userModel);
            }});
        }
    });
});
