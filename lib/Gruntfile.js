module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    jshint: {
      files: ['../javascripts/**/*.js'],
      options: {
        predef: [ "document", "console", "$", "firebase", "FbAPI", "app", "angular"],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
     sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/styles.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd:"../",
            src: [
              "index.html",
              "javascripts/**/*.js",
              "css/**/*.css",
              "partials/**/*.html",
              "lib/node_modules/jquery/dist/jquery.min.js",
              "lib/node_modules/materialize-css/dist/js/materialize.min.js",
              "lib/node_modules/angular/angular.min.js",
              "lib/bower_components/angular-route/angular-route.min.js",
              "lib/node_modules/chart.js/dist/Chart.min.js",
              "lib/node_modules/angular-chart.js/dist/angular-chart.min.js",
              "lib/node_modules/materialize-css/dist/css/materialize.min.css",
              "lib/node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff",
              "lib/node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff2",
              "lib/node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.ttf"
            ],
            dest: "../public/"
        }
        ]
      }
    }
  });

  grunt.registerTask('default', ['sass', 'jshint', 'watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('deploy', ['copy']);
};
