require.config({
    paths: {
        jquery: 'vendor/jquery',
        backbone: 'vendor/backbone',
        'backbone.touch': '../backbone.touch',
        underscore: 'vendor/underscore'
    },

    shim: {
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    },
    urlArgs: '?bust=1'
});
define(['jquery', 'view'], function($, View)
{
    new View({
        el : $('#main')
    }).render();
});
