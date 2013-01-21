/*global define*/

define(['modules/feeds/models/abstract'], function (FeedsAbstractModel) {
    'use strict';

    return FeedsAbstractModel.extend({
        // TODO TODO TODO
        'like': function (options) {
            // TODO get real value
            if (this.liked) {
                return this.unlike(options);
            }

            this.liked = true;
            this.get('metadata').like += 1;
            // TODO plug back when feeds done
            //this.save(options);
            this.trigger('change:like');

            return this;
        },
        'unlike': function (options) {
            this.liked = false;
            this.get('metadata').like -= 1;
            // TODO plug back when feeds done
            //this.save(options);
            this.trigger('change:like');

            return this;
        },
        'isLikedByUser': function () {
            return this.liked;
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
