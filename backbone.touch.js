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
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    // Alias the libraries from the global object
    var Backbone = this.Backbone;
    var _ = this._;
    var document = this.document;

    _.extend(Backbone.View.prototype, {
        _touching : false,

        _touchPrevents : true,

        isTouch : 'ontouchstart' in document,

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
                if (eventName === 'click' && this.isTouch) {
                    if (selector !== '') {
                        this.$el.delegate(selector, 'touchstart' + suffix, this._touchHandler);
                        this.$el.delegate(selector, 'touchmove' + suffix, this._touchHandler);
                        this.$el.delegate(selector, 'touchend' + suffix,
                            {method:method},
                            this._touchHandler
                        );
                    } else {
                        this.$el.bind('touchstart' + suffix, this._touchHandler);
                        this.$el.bind('touchmove' + suffix, this._touchHandler);
                        this.$el.bind('touchend' + suffix, {method : method}, this._touchHandler);
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

        // At the first touchstart we register touchevents as ongoing
        // and as soon as a touch move happens we set touching to false,
        // thus implying that a fastclick will not happen when
        // touchend occurs. If no touchmove happened
        // inbetween touchstart and touchend we trigger the event
        //
        // The `_touchPrevents` toggle decides if Backbone.touch
        // will stop propagation and prevent default
        // for *button* and *a* elements
        _touchHandler : function(e) {
            switch (e.type) {
                case 'touchstart':
                    this._touching = true;
                    break;
                case 'touchmove':
                    this._touching = false;
                    break;
                case 'touchend':
                    if (this._touching) {
                        this._touching = false;
                        if (this._touchPrevents) {
                            var tagName = e.currentTarget.tagName;
                            if (tagName === 'BUTTON' ||
                                tagName === 'A') {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }
                        e.data.method(e);
                    }
                    break;
            }
        }
    });
}).call(this);
