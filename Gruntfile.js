module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); //load all grunt tasks

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      index: '.'
    },
    stylus: {
      compile: {
        options: {
          compress: false,
          use: [ require('nib') ],
          "include css": true
        },
        files: {
          '<%= paths.index %>/bundle.css': '<%= paths.index %>/css/gadget.styl'
        }
      }
    },
    browserify: {
      dev: {
        files: {
          '<%= paths.index %>/bundle.js': ['<%= paths.index %>/gadget.js'],
        }
      }
    },
    bgShell: {                               // Task
      versalPreview: {                      // Target
        cmd: 'versal preview',
        stdout: true,
        stderr: false,
        bg: true
      }
    },
    watch: {
      options: {
        spawn: false
      },
      dev: {
        files: [
          '<%= paths.index %>/gadget.js',
          '<%= paths.index %>/scripts/**/*.js',
          '<%= paths.index %>/css/**/*.styl'
        ],
        tasks: ['killVersalPreview', 'stylus', 'browserify', 'bgShell']
      }
    }
  });

  var exec = require('child_process').exec;
  grunt.registerTask('killVersalPreview', function () {
    exec('kill `pgrep -f "versal preview"`');
  });

  grunt.registerTask('default', ['stylus', 'browserify', 'bgShell', 'watch']);
};
