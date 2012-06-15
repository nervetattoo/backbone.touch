View = Backbone.View.extend({
    _click : null,
    _touch : null,
    isTouch : false,

    events : {
        'click button' : 'clicked',
        'touchstart button' : 'touched'
    },

    initialize : function() {
        this.isTouch = 'ontouchstart' in document;
        this.$touch = this.$('#touch');
        this.$click = this.$('#click');
        this.$diff = this.$('#diff');
        if (!this.isTouch)
            this.$diff.parent().hide();
    },

    touched : function() {
        this._touch = Date.now();
        this.render();
    },

    clicked : function() {
        this._click = Date.now();
        this.render();
    },

    render : function() {
        this.$click.text(this._click);
        this.$touch.text(this._touch);
        if (this.isTouch)
            this.$diff.text(this._click - this._touch);
        return this;
    }
});
