/*global define, _*/

define([
    'backbone',
    'format/main',
    'modules/ticker/templates/main.tpl'
], function (
    Backbone,
    Format,
    tpl
) {
    'use strict';

    return Backbone.View.extend({
        'className': 'tickers',
        'tagName': 'div',
        'maxCharAllowed': 120,
        'referenceTag': null,
        'currentReference': false,
        'events': {
            'click > .ticker > .message > .context-menu > .item.twitter': function (e) {
                // TODO move social features out
                // TODO add reference and username (if possible get user @twitter)
                var url = 'https://twitter.com/intent/tweet/?text=' +
                    escape($(e.target).parents('.message').find('.text > .content').text() +
                    ' ' + window.location.href +
                    ' @commonecoute');
                window.open(url);

                return false;
            },
            'click > .ticker.global > .badge': function (e) {
                this.trigger('ticker::user::show', e.currentTarget.getAttribute('data-user-id'));
            },
            'click > .ticker > .message > .text > .reference': function (e) {
                App.mediator.emit('user::messages::seek', parseInt($(e.currentTarget).attr('data-reference'), 10));

                return false;
            },
            'focus textarea': function (e) {
                if (! App.session.isValid()) {
                    App.session.signin();
                    e.target.blur();

                    return false;
                }

                this.$el.addClass('on');

                return true;
            },
            'blur textarea': function (e) {
                if (e.target.value.length > 0) {
                    return;
                }

                this.$el.removeClass('on');
            },
            'keydown textarea': function (e) {
                if (e.keyCode !== 13 /* ENTER */ || e.target.value.length > this.maxCharAllowed) {
                    return;
                }

                App.mediator.emit(
                    'user::messages::create',
                    e.target.value,
                    this.currentReference
                );
                // TODO freeze textarea until message is saved (wait for message to return)
                this.reset();

                return false;
            },
            'keyup textarea': function (e) {
                this.updateCounter(e.target.value.length);
            }
        },
        'initialize': function () {
            this.$el.html(_.template(tpl, {'currentLength': this.maxCharAllowed}));
            this.referenceTag = this.$el.find('> .form > .reference');
        },
        'updateCounter': function (count) {
            var counter = this.$el.find('> .form > .counter');
            count = this.maxCharAllowed - count;

            counter.text(count);

            if (count < 0) {
                counter.addClass('error');
                counter.removeClass('warning');
            } else if (count < (this.maxCharAllowed / 3)) {
                counter.addClass('warning');
                counter.removeClass('error');
            } else {
                counter.removeClass('error warning');
            }
        },
        'updateReference': function (reference) {
            if (this.$el.hasClass('on')) {
                return;
            }

            this.referenceTag[0].innerText = Format.hhmmss(reference);
            this.currentReference = reference;
        },
        'reset': function () {
            var textarea = this.$el.find('> .form > textarea');

            if (textarea.val().length === 0) {
                return;
            }

            textarea.val(null);
            textarea.blur();
            this.updateCounter(0);
        },
        'appendTicker': function (ticker, show) {
            if (! show) {
                ticker.hideRight();
            }
            ticker.$el.appendTo(this.$el);
        },
        'render': function () {
            return this;
        }
    });
});
