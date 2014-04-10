'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var basePathsConfig = {
        dev: 'assets/dev',
        dist: 'assets/dist',
        tmp: '.tmp',
        views: 'views'
    },

    pathsConfig = {
        dev: {
            scripts: '<%= basePaths.dev %>/scripts',
            styles: {
                sass: '<%= basePaths.dev %>/styles/sass',
                css: '<%= basePaths.dev %>/styles/css'
            },
            images: '<%= basePaths.dev %>/images',
            fonts: '<%= basePaths.dev %>/fonts',
            icons: '<%= basePaths.dev %>/icons'
        },
        dist: {
            scripts: '<%= basePaths.dist %>/scripts',
            styles: {
                sass: '<%= basePaths.dist %>/styles/sass',
                css: '<%= basePaths.dist %>/styles/css'
            },
            images: '<%= basePaths.dist %>/images',
            fonts: '<%= basePaths.dist %>/fonts',
            icons: '<%= basePaths.dist %>/icons'
        },
        tmp: {
            scripts: '<%= basePaths.tmp %>/scripts',
            styles: {
                sass: '<%= basePaths.tmp %>/styles/sass',
                css: '<%= basePaths.tmp %>/styles/css'
            },
            images: '<%= basePaths.tmp %>/images',
            fonts: '<%= basePaths.tmp %>/fonts',
            icons: '<%= basePaths.tmp %>/icons'
        }
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        basePaths: basePathsConfig,
        paths: pathsConfig,

        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        basePathsConfig.tmp,
                        '<%= paths.dev.icons %>/png/*'
                    ],
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        basePathsConfig.tmp,
                        '<%= basePaths.dist %>/*',
                        '!<%= basePaths.dist %>/.git*',
                        '<%= paths.dev.icons %>/png/*'
                    ]
                }]
            }
        },

        watch: {
            styles: {
                files: ['<%= paths.dev.styles.sass %>/{,*/}*.{sass,scss}'],
                tasks: ['styles:dev']
            },
            scripts: {
                files: ['<%= paths.dev.scripts %>/{,*/}*.js'],
                tasks: ['jshint']
            },
            icons: {
                files: ['**/*.{svg,png}', '!png/*'],
                tasks: ['grunticon:dev']
            },
            livereload: {
                options: { livereload: true },
                files: [
                    '<%= paths.dev.styles.css %>/{,*/}*.css',
                    '<%= paths.dev.icons %>/*.css',
                    '<%= paths.dev.scripts %>/{,*/}*.js',
                    '<%= paths.dev.images %>{,*/}*.{png,jpg,gif,svg}',
                    '<%= basePaths.views %>/**/*.twig',
                    './**/*.php'
                ],
            }
        },

        copy: {
            dev: {
                expand: true,
                dot: true,
                cwd: pathsConfig.tmp.styles.css,
                dest: pathsConfig.dev.styles.css,
                src: ['{,*/}*.css']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: pathsConfig.tmp.styles.css,
                        dest: pathsConfig.dist.styles.css,
                        src: ['{,*/}*.css']
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: pathsConfig.dev.fonts,
                        dest: pathsConfig.dist.fonts,
                        src: ['{,*/}*.{ttf,eot,woff,svg}']
                    }
                ]
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', '<%= paths.dev.scripts %>/{,*/}*.js']
        },

        compass: {
            options: {
                sassDir: pathsConfig.dev.styles.sass,
                cssDir: '<%= paths.tmp.styles.css %>',
                outputStyle: 'expanded',
                imagesDir: '<%= paths.dev.images %>',
                fontsDir: '<%= paths.dev.fonts %>',
                generatedImagesDir: '<%= paths.dev.images %>',
                relativeAssets: true,
                cacheDir: '<%= basePaths.tmp %>/.sass-cache'
            },
            dev: { },
            dist: {
                options: {
                    imagesDir: '<%= paths.dist.images %>',
                    fontsDir: '<%= paths.dist.fonts %>',
                    generatedImagesDir: '<%= paths.dist.images %>',
                    environment: 'production'
                }
            }
        },

        autoprefixer: {
            options: {},
            dev: {
                src: '<%= paths.dev.styles.css %>/{,*/}*.css'
            },
            dist: {
                src: '<%= paths.dist.styles.css %>/{,*/}*.css'
            }
        },

        cmq: {
            options: {},
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist.styles.css %>',
                    src: ['{,*/}*.css'],
                    dest: '<%= paths.dist.styles.css %>'
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.dist.styles.css %>',
                    src: ['{,*/}*.css'],
                    dest: '<%= paths.dist.styles.css %>'
                }, {
                    expand: true,
                    cwd: '<%= paths.dist.icons %>',
                    src: ['{,*/}*.css'],
                    dest: '<%= paths.dist.icons %>'
                }]
            }
        },

        imagemin: {
            dist: {
                options: { cache: false },
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= paths.dist.images %>'
                }, {
                    expand: true,
                    cwd: '<%= paths.dev.icons %>',
                    src: ['**/*.png'],
                    dest: '<%= paths.tmp.icons %>'
                }]
            }
        },

        svgmin: {
            options: {
                cssprefix: ''
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev.images %>',
                    src: ['**/*.svg'],
                    dest: '<%= paths.dist.images %>'
                }, {
                    expand: true,
                    cwd: '<%= paths.dev.icons %>',
                    src: ['**/*.svg'],
                    dest: '<%= paths.tmp.icons %>'
                }]
            }
        },

        grunticon: {
            dev: {
                options: {
                    cssprefix: '.'
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.dev.icons %>',
                    src: ['**/*.{svg,png}', '!png/*'],
                    dest: '<%= paths.dev.icons %>'
                }]
            },
            dist: {
                options: {
                    snippetFile: '<%= basePaths.tmp %>/.grunticon/snippet.js',
                    previewFile: '<%= basePaths.tmp %>/.grunticon/preview.html',
                    cssprefix: '.'
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.tmp.icons %>',
                    src: ['**/*.{svg,png}', '!png/*'],
                    dest: '<%= paths.dist.icons %>'
                }]
            }
        },

        bower: {
            all: {
                options: {
                    exclude: ['jquery']
                },
                rjsConfig: '<%= paths.dev.scripts %>/main.js'
            }
        },

        requirejs: {
            dist: {
                options: {
                    name: 'main',
                    baseUrl: '<%= paths.dev.scripts %>',
                    mainConfigFile: '<%= paths.dev.scripts %>/main.js',
                    out: '<%= paths.dist.scripts %>/main.js',
                    optimize: 'uglify2',
                    preserveLicenseComments: false,
                    generateSourceMaps: true,
                }
            }
        }

    });

    grunt.registerTask('styles:dev',
        [
            'compass:dev',
            'copy:dev',
            'autoprefixer:dev'
        ]
    );

    grunt.registerTask('styles:dist',
        [
            'compass:dist',
            'copy:dist',
            'autoprefixer:dist',
            'cmq:dist',
            'cssmin:dist'
        ]
    );

    grunt.registerTask('dev',
        [
            'clean:dev',
            'bower',
            'jshint',
            'styles:dev',
            'grunticon:dev',
            'watch'
        ]
    );

    grunt.registerTask('dist',
        [
            'clean:dist',
            'bower',
            'jshint',
            'requirejs:dist',
            'imagemin:dist',
            'svgmin:dist',
            'grunticon:dist',
            'styles:dist'
        ]
    );

};
