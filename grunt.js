module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      banner: "/*!\n" + " * backbone.touch.js v0.1\n" +
        " * Copyright 2012, Raymond Julin (@nervetattoo)\n" +
        " * backbone.touch.js may be freely distributed under" +
        " the MIT license.\n */"
    },

    lint: {
      files: ["grunt.js", "backbone.touch.js"]
    },

    min: {
      "dist/backbone.touch.min.js": ["<banner>",
        "backbone.touch.js"]
    },

    watch: {
      files: "<config:lint.files>",
      tasks: "lint"
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
        node: true
      },
      globals: {_:true,Backbone:true,define:true}
    }
  });

  // Default task.
  grunt.registerTask("default", "lint min");

};
