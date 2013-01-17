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
        'timeRange': 60 * 3,
        'build': function () {
            this.collection = new FeedsCollectionsMessage(null, {
                'comparator': function (model) {
                    return -model.get('reference');
                }
            });

            App.mediator.on('player::currentReference', _.throttle(function (reference) {
                this.render(reference);
            }, this.updateThrottle), this);
        },
        'pushModel': function (model) {
            this.collection.add(model);

            return this;
        },
        'checkReferenceRange': function (messageReference, globalReference) {
            return messageReference >= (globalReference - this.timeRange) && messageReference <= globalReference;
        },
        'render': function (reference) {
            var models = this.collection.filter(function (model) {
                return this.checkReferenceRange(model.get('reference'), reference);
            }, this);

            if (models.length === 0) {
                // TODO fix blink (when posting a new comment)
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
                if (App.session.isValid() && this.model.get('created_by') === App.session.user.get('id')) {
                    this.$el.addClass('my');
                }

                this.$el
                    .html(_.template(tpl, {
                        'model': this.model,
                        'Format': Format
                    }))
                    .attr({
                        'data-user-id': this.model.get('created_by'),
                        'data-message-id': this.model.get('id')
                    });
                this.buildMenu();
                this.show();
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
