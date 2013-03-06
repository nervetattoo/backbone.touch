(function (factory) {

    "use strict";

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['backbone.touch'], factory);
    } else {
        // Browser globals
        factory(Backbone);
    }
}(function (Backbone) {
    View = Backbone.View.extend({
        _click : null,
        _touch : null,
        _tapped : null,

        touchPrevents : false,

        events : {
            'click .tap' : 'tapped',
            'touchstart .tap' : 'setTime',
            'touchstart .click' : 'setTime'
        },

        initialize : function() {
            _.bindAll(this);
            this.$('.click').on('click', this.clicked);
        },

        setTime : function(e) {
            this.$(e.currentTarget).data('time', Date.now());
        },

        tapped : function(e) {
            this._tapped = Date.now() - this.$(e.currentTarget).data('time');
            this.render();
        },

        clicked : function(e) {
            this._click = Date.now() - this.$(e.currentTarget).data('time');
            this.render();
        },

        render : function() {
            if (this.isTouch) {
                this.$('.slower').text(this._tapped + 'ms');
                this.$('.faster').text(this._click + 'ms');
            }
            return this;
        }
    });

    return View;
}));
