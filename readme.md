Backbone.touch
==============

Monkey patch Backbone.View to enable fast tap events on touch devices.

## Usage ##

Backbone.touch is made to work with your existing views.
It replaces the `delegateEvents` method and replaces any *click* event
with the three events *touchstart*, *touchmove* and *touchend* when a touch
device is used. Once the touchend fires your callback is executed without the
300ms delay that the *click* event has.

## Download & Include ##

### Bower install

`bower install backbone.touch`

### Manual download

* [Development](https://raw.github.com/nervetattoo/backbone.touch/master/backbone.touch.js)
* [Production](https://raw.github.com/nervetattoo/backbone.touch/master/dist/backbone.touch.min.js)

Depends on Underscore, Backbone and jQuery.  You can swap out the 
jQuery dependency completely with a custom configuration.

Include in your application *after* jQuery, Underscore, and Backbone have been
included.

``` html
<script src="/js/jquery.js"></script>
<script src="/js/underscore.js"></script>
<script src="/js/backbone.js"></script>

<script src="/js/backbone.touch.js"></script>
```

Note that backbone.touch currently overwrites `Backbone.View` to make its usage
a no-op part from including it.

## Release notes ##

### 0.4 ###

* NodeJS + Browserify environment support

### 0.3 ###

* Possibility to override the threshold
* Grunt v4.0

### 0.2 ###

* Register as an anonymous AMD module

### 0.1 ###

* Initial release. Only tested on iPad

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
(c) [Raymond Julin](http://twitter.com/nervetattoo)
