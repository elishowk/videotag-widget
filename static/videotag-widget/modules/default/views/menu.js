/*global define, _*/

define(['backbone'], function (Backbone) {
    'use strict';

    return Backbone.View.extend({
        'className': 'context-menu',
        'tagName': 'span',
        'defaultOptions': {
            'title': '',
            'index': 0,
            'className': '',
            'attrs': {}
        },
        'hide': function (item) {
            this.$el.children('.item.' + item).hide();
        },
        'show': function (item) {
            this.$el.children('.item.' + item).show();
        },
        'add': function (item, options) {
            options = _.defaults(options || {}, this.defaultOptions);

            if (this.$el.children('.' + item).length > 0) {
                return this.update(item, options);
            }

            this.$el.append($('<span>').addClass('item ' + item));

            return this.update(item, options);
        },
        'update': function (item, options) {
            var itemTag = this.$el.children('.item.' + item);

            if (itemTag.length === 0) {
                return this;
            }

            if (options.title !== undefined) {
                itemTag.text(options.title);
            }

            if (options.className) {
                var classNames = options.className.split(' ');

                classNames.forEach(function (className) {
                    if (className.substr(0, 1) === '-') {
                        itemTag.removeClass(className.substr(1));
                    } else {
                        itemTag.addClass(className);
                    }
                });
            }

            if (_.size(options.attrs) > 0) {
                itemTag.attr(options.attrs);
            }

            if (options.index > 0 && this.$el.children().length > options.index) {
                this.$el.children('.item:nth-child(' + (options.index + 1) + ')');
            } else {
                this.$el.prepend(itemTag);
            }
        },
        'remove': function (item) {
            this.$el.children('.item.' + item).remove();

            return this;
        }
    });
});
