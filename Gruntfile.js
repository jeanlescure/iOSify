module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    inline: {
      options:{
        tag: '',
        uglify: true,
        cssmin: true
      },
      dist: {
        src: 'src/index.html',
        dest: 'dist/temp.html'
      }
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/temp.html': 'dist/temp.html'
        }
      }
    },
    execute: {
      target: {
        src: ['iosify.js']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-execute');

  // Default task(s).
  grunt.registerTask('default', ['inline', 'htmlmin', 'execute']);

};