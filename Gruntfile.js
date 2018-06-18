module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  
  var mq4HoverShim = require('mq4-hover-shim');
  var autoprefixer = require('autoprefixer')([
    "Chrome >= 45",
    "Firefox ESR",
    "Edge >= 12",
    "Explorer >= 10",
    "iOS >= 9",
    "Safari >= 9",
    "Android >= 4.4",
    "Opera >= 30"
  ]);

  // Project configuration.
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          "node_modules/jquery/dist/jquery.js", 
          "node_modules/popper.js/dist/umd/popper.js",
          "node_modules/bootstrap/dist/js/bootstrap.js",
          "src/js/jquery.mCustomScrollbar.concat.min.js",
          "src/js/index.js"
        ],
        dest: "dist/js/app.js"
      }
    },
    sass: {
      options: {
        includePaths: ['node_modules/bootstrap/scss'],
        precision: 6,
        sourceComments: false,
        sourceMap: true,
        outputStyle: 'expanded'
      },
      dist: {
        files: {
          'dist/css/app.css': 'src/scss/app.scss'
        }
      }
    },
    postcss: {
      core: {
        options: {
          map: true,
          processors: [
            mq4HoverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover ' }),
            autoprefixer
          ]
        },
        src: 'dist/css/*.css'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },
    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['compile-sass'],
        options: {
         livereload: true 
        }
      },
      html: {
        files: '*.html',
        options: {
         livereload: true 
        }
      },
      js: {
        files: 'src/js/*.js',
        options: {
         livereload: true 
        }
      }          
    },
    connect: {
      server: {
        options: {
          port: 8080,
          livereload: true
        }
      }
    }
  });
  
  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {});
  require('time-grunt')(grunt);
      
  grunt.registerTask('compile-sass', ['sass', 'postcss', 'cssmin']);
  // Default task.
  grunt.registerTask('default', ['sass', 'concat', 'postcss', 'connect', 'watch']);

};
