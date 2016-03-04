module.exports = function(grunt){
    "use strict";

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
          images: {
            expand: true,
            cwd: "public/images/logos",
            src: '**/*',
            dest: 'public/dist/css/images/'
          },
          jsTreeImages: {
            expand: true,
            cwd: "public/bower_components/jstree/dist/themes/default/",
            src: ['**/*.png', '**/*.gif'],
            dest: 'public/dist/css'
          }
        },
        concat: {
          options: {
              separator: ';'
          },
          basic: {
            src: [
                'public/bower_components/jquery/dist/jquery.min.js',
                'public/bower_components/jquery-ui/jquery-ui.min.js',
                'public/bower_components/jquery-validation/dist/jquery.validate.min.js',
                'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
                'public/bower_components/jstree/dist/jstree.min.js',
                'public/bower_components/jsgrid/dist/jsgrid.min.js'
            ],
            dest: 'public/dist/scripts.js'
          },
          extras: {
            src: ['public/js/**/*.js'],
            dest: 'public/dist/main.js',
          },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/dist/main.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        compass: {
            compassCompile: {
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    cacheDir: 'public/.sass-cache',
                    force: true
                }
            },
            server: {
                options: {
                    sassDir: 'public/sass',
                    cssDir: 'public/css',
                    cacheDir: 'public/.sass-cache',
                    force: true,
                    watch: true
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'public/dist/css/styles.min.css' : ['public/css/**/*.css']
                }
            }
        },
        clean: {
            dist: {
                src: ['public/dist/*']
            }
        },
        watch: {
            css: {
                files: 'public/sass/**/*.scss',
                tasks: ['compassCompile','cssmin']
            },
            js: {
                files: 'public/js/**/*.js',
                tasks: ['concat:extras']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: ['public/css/**/*.css', 'public/*.html', 'public/**/*.js']
            }
        },
        connect: {
            serverLive: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: 35729,
                    base: {
                        path: 'public/',
                        index: 'index.html'
                    },
                    open: true
                }
            },
            serverStatic: {
                options: {
                    port: 8000,
                    hostname: '*',
                    livereload: false,
                    base: {
                        path: 'public/',
                        index: 'index.html'
                    },
                    open: true
                }
            }
        }
    });

    //TODO: creating appropiate HTML file
    grunt.registerTask('dist', [
        'clean',
        'compass:compassCompile',
        'cssmin',
        //'jshint',
        'concat',
        'copy'
        //'uglify'
    ]);

    grunt.registerTask('compassCompile', [
        'compass:compassCompile'
    ]);

    grunt.registerTask('server', [
        'compass:compassCompile',
        'connect:serverStatic',
        'compass:server'
    ]);

    grunt.registerTask('serverLive', [
        'dist',
        'connect:serverLive',
        'watch'
    ]);
};
