/*global define, _*/

define([
    'app',
    'modules/ticker/views/message',
    'modules/feeds/collections/message',
    'format/main',
    'modules/ticker/templates/message.tpl'
], function (
    App,
    TickerViewsMessage,
    FeedsCollectionsMessage,
    Format,
    tpl
) {
    'use strict';

    return TickerViewsMessage.extend({
        'className': 'message badge',
        'collection': null,
        'model': null,
        'updateThrottle': 1000,
        'initialize': function () {
            App.mediator.on('player::reference::current', _.throttle(function () {
                this.render();
            }, this.updateThrottle), this);
        },
        'render': function () {
            var models = this.collection.filter(function (model) {
                var reference = model.get('reference');

                return reference >= (App.currentReference - App.timeRange) && reference <= App.currentReference;
            }, this);

            if (models.length === 0) {
                return this.hide();
            }

            var model = _.reduce(models, function (modelA, modelB) {
                var referenceA = modelA.get('reference');
                var referenceB = modelB.get('reference');

                if (referenceA === referenceB) {
                    if (modelA.get('created_at') > modelB.get('created_at')) {
                        return modelA;
                    } else {
                        return modelB;
                    }
                } else if (referenceA > referenceB) {
                    return modelA;
                }

                return modelB;
            });

            if (model === this.model) {
                return this.show();
            }

            if (this.model) {
                this.model.off('change:like', this.onLike, this);
            }

            this.model = model;
            this.model.on('change:like', this.onLike, this);

            window.setImmediate(function () {
                // TODO should *NOT* be able to delete message after signout
                if (App.session.isValid() && this.model.get('created_by') === App.session.user.get('id')) {
                    this.$el.addClass('my');
                }

                this.model.fetchUser(function (userModel) {
                    this.$el
                        .html(_.template(tpl, {
                            'model': this.model,
                            'user': userModel,
                            'Format': Format
                        }))
                        .attr('data-user-id', this.model.get('created_by'));
                    this.buildMenu();
                    this.show();
                }.bind(this));
            }.bind(this));

            return this;
        },
        'onLike': function () {
            this.menu.update('like', {'className': this.model.isLikedByUser() ? 'on' : '-on'});
        },
        'show': function () {
            this.$el.addClass('on');

            return this;
        },
        'hide': function () {
            this.$el.removeClass('on');

            return this;
        }
    });
});
