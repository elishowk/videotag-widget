/*global define, _*/

define([
    'app',
    'backbone',
    'modules/default/views/menu',
    'format/main',
    'modules/ticker/templates/message.tpl'
], function (
    App,
    Backbone,
    DefaultViewsMenu,
    Format,
    tpl
) {
    'use strict';

    return Backbone.View.extend({
        'className': 'message',
        'tagName': 'div',
        'model': null,
        'menu': null,
        'events': {
            'click > .context-menu > .item.delete': function () {
                this.model.destroy();
            },
            'click > .context-menu > .item.like': function () {
                this.model.like();

                return false;
            }
        },
        'initialize': function () {
            this.build();
        },
        'build': function () {
            if (App.session.isValid() && this.model.get('created_by') === App.session.user.get('id')) {
                this.$el.addClass('my');
            }

            this.model.on('change:like', function () {
                this.menu.update('like', {'className': this.model.isLikedByUser() ? 'on' : '-on'});
            }, this);

            App.mediator.on('player::currentReference', function (reference) {
                if (reference < this.model.get('reference')) {
                    this.hide();
                } else {
                    this.show();
                }
            }, this);
        },
        'buildMenu': function () {
            this.menu = new DefaultViewsMenu();
            this.menu.add('delete');
            this.menu.add('twitter');
            this.menu.add('like', {
                'className': this.model.isLikedByUser() ? 'on' : '',
                'attrs': {'data-like-count': this.model.get('metadata').liked}
            });

            this.$el.append(this.menu.$el);
        },
        'render': function () {
            this.$el.attr('id', 'message-' + this.model.get('id'));
            this.$el.html(_.template(tpl, {
                'model': this.model,
                'Format': Format
            }));

            this.buildMenu();

            return this;
        },
        'show': function () {
            this.$el.addClass('on');

            return this;
        },
        'hide': function () {
            this.$el.removeClass('on');

            return this;
        },
    });
});
