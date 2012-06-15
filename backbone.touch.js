//     Backbone.touch.js 0.1

//     (c) 2012 Raymond Julin, Keyteq AS
//     Backbone.touch may be freely distributed under the MIT license.
(function() {
    // The `getValue` and `delegateEventSplitter` is copied from 
    // Backbones source, unfortunately these are not available
    // in any form from Backbone itself
    var getValue = function(object, prop) {
        if (!(object && object[prop])) return null;
        return _.isFunction(object[prop]) ? object[prop]() : object[prop];
    };
    var isTouch = 'ontouchstart' in this.document,
        delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // Alias the libraries from the global object
    var Backbone = this.Backbone;
    var _ = this._;

    _.extend(Backbone.View.prototype, {
        touching : false,

        // Drop in replacement for Backbone.View#delegateEvent
        // Enables better touch support
        // 
        // If the users device is touch enabled it replace any `click`
        // event with listening for touch(start|move|end) in order to
        // quickly trigger touch taps
        delegateEvents: function(events) {
            if (!(events || (events = getValue(this, 'events')))) return;
            this.undelegateEvents();
            var suffix = '.delegateEvents' + this.cid;
            _(events).each(function(method, key) {
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                if (eventName === 'click' && isTouch) {
                    if (selector !== '') {
                        this.$el.delegate(selector, 'touchstart' + suffix, this.touchHandler);
                        this.$el.delegate(selector, 'touchmove' + suffix, this.touchHandler);
                        this.$el.delegate(selector, 'touchend' + suffix,
                            {method:method},
                            this.touchHandler
                        );
                    } else {
                        this.$el.bind('touchstart' + suffix, this.touchHandler);
                        this.$el.bind('touchmove' + suffix, this.touchHandler);
                        this.$el.bind('touchend' + suffix, {method : method}, this.touchHandler);
                    }
                }
                else {
                    eventName += suffix;
                    if (selector === '') {
                        this.$el.bind(eventName, method);
                    } else {
                        this.$el.delegate(selector, eventName, method);
                    }
                }
            }, this);
        },

        touchHandler : function(e) {
            switch (e.type) {
                case 'touchstart':
                    this.touching = true;
                    break;
                case 'touchmove':
                    this.touching = false;
                    break;
                case 'touchend':
                    if (this.touching) {
                        this.touching = false;
                        e.preventDefault();
                        e.stopPropagation();
                        e.data.method(e);
                    }
                    break;
            }
        }
    });
}).call(this);
