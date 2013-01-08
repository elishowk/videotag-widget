/*global define*/

define(['modules/feeds/models/abstract'], function (FeedsAbstractModel) {
    'use strict';

    return FeedsAbstractModel.extend({
        // TODO get properly `liked by user` value in `initialize`
        'liked': false,
        'like': function (options) {
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
        }
    });
});
