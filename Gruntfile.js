module.exports = function(grunt) {
  "use strict";

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: "/*!\n" + " * <%= pkg.name %> - v<%= pkg.version %>\n" +
        " * Copyright 2012, <%= pkg.author.name %> (@nervetattoo)\n" +
        " * backbone.touch.js may be freely distributed under" +
        " the MIT license.\n */"
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          "dist/backbone.touch.min.js": "backbone.touch.js"
        }
      }
    },

    watch: {
      files: "<config:jshint.files>",
      tasks: "jshint:dist"
    },

    jshint: {
      options: {
        boss: true,
        curly: false,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        node: true,
        globals: {_:true, Backbone:true, define:true, document:true, window:true}
      },
      files: ["Gruntfile.js", "backbone.touch.js"]
    }
  });

  // Default task.
  grunt.registerTask("default", ["jshint", "uglify:dist"]);

};
