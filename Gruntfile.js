module.exports = function(grunt) {

    'use strict';

    // Load all grunt tasks
    // --------------------------
    require('load-grunt-tasks')(grunt);


    // Init Config
    // --------------------------
    var appConfig = {

        // Dirs
        dirs: {
            dist:     'dist',
            assets:   'assets',
            js:       '<%= dirs.assets %>/js',
            css:      '<%= dirs.assets %>/css',
            img:      '<%= dirs.assets %>/img',
            fonts:    '<%= dirs.assets %>/fonts',
            siteurl:  'http://50anos.unisul.br'
        },

        // FTP vars
        ftp: {
            server:     '10.1.43.128',
            port:       21,
            serverPath: '/'
        },

        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner:
        '\n' +
        '/*\n' +
        ' * -------------------------------------------------------\n' +
        ' * Project: <%= pkg.title %>\n' +
        ' * Version: <%= pkg.version %>\n' +
        ' * Author:  <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today(\'yyyy\') %> <%= pkg.author.name %>\n' +
        ' * -------------------------------------------------------\n' +
        ' */\n' +
        '\n',

        // Start Server
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    hostname: '10.4.8.47',
                    livereload: true,
                    open: true
                }
            }
        },

        // Clean 'dist' folder
        clean: {
            dist: ['<%= dirs.dist %>/**/*']
        },

        // Copy files to 'dist' folder
        copy: {
            main: {
                files: [
                    // Copy assets
                    {
                        src: ['<%= dirs.img %>/**/*', '<%= dirs.fonts %>/*', '<%= dirs.js %>/*.js'],
                        dest: '<%= dirs.dist %>/'
                    },
                    // Copy files
                    {
                        expand: true, 
                        src: ['*.{html,php,htc,txt,xml}'],
                        dest: '<%= dirs.dist %>/', 
                        filter: 'isFile'
                    },
                ]
            },
        },

        // EJS render
        ejs: {
            all: {
                options: {
                    title: 'Unisul 50 anos',
                    description: 'Em 2014 a Unisul completa 50 anos. Conheça e interaja com a nossa história, contribuindo com uma narrativa sobre experiência na universidade.',
                    site_url: '<%= dirs.siteurl %>',
                    img_assets: '<%= dirs.img %>/',
                    assets_preview_identidade: 'assets/img/identidade-visual/large/',
                    folder_documentos: 'download/docs/',
                    folder_wallpaper: 'download/wallpaper/',
                    folder_pdf_download: 'download/',
                    url_timeline: 'timeline/'
                },
                src: ['./*.ejs', '!/includes/**/*'],
                dest: './',
                expand: true,
                ext: '.html',
            },
        },

        // Watch Task
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint']
            },
            html: {
                files: ['*.ejs', 'includes/*.ejs'],
                tasks: ['ejs']
            },
            css: {
                files: ['src/stylus/**/*.styl'],
                tasks: ['stylus']
            }
        },

        // CSS Minify
        cssmin: {
            dist: {
                files: {
                    '<%= dirs.dist %>/<%= dirs.css %>/main.css': [ '<%= dirs.css %>/main.css' ]
                }
            }
        },

        // JS Linting
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '<%= dirs.js %>/main.js'
            ]
        },

        // JS Minify
        uglify: {
            options: {
                mangle: false,
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= dirs.js %>/built.js',
                dest: '<%= dirs.dist %>/<%= dirs.js %>/built.js'
            }
        },

        // JS Concat
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: '<%= dirs.js %>/*.js',
                dest: '<%= dirs.js %>/built.js',
            },
        },

        // Stylus
        stylus: {
            compile: {
                options: {
                    paths: ['/<%= dirs.css %>/'],
                    compress: false,
                    "include css": true
                },
                files: {
                    'assets/css/main.css': 'src/stylus/main.styl'
                }
            }
        },

        // HTML Min
        htmlmin: {                                     
            dist: {                                     
                options: {                                 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   
                    '<%= dirs.dist %>/index.html': '<%= dirs.dist %>/index.html',
                }
            }
        },

        // FTP deploy
        'ftp_upload': {
            all: {
                auth: {
                  host: '<%= ftp.server %>',
                  port: '<%= ftp.port %>',
                  authKey: 'key1'
                },
                src: '<%= dirs.dist %>',
                dest: '<%= ftp.serverPath %>',
                exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'dist/tmp']
            },
            htmlcss: {
                auth: {
                  host: '<%= ftp.server %>',
                  port: '<%= ftp.port %>',
                  authKey: 'key1'
                },
                src: '<%= dirs.dist %>',
                dest: '<%= ftp.serverPath %>',
                exclusions: ['<%= dirs.dist %>/<%= dirs.fonts %>/*', '<%= dirs.dist %>/<%= dirs.img %>/**/*']
            }
        }

    };

    grunt.initConfig(appConfig);

    // Register tasks
    // --------------------------
    grunt.registerTask( 'default',    [ 'connect', 'watch' ]);
    grunt.registerTask( 'build',      [ 'clean', 'ejs', 'copy', 'uglify:dist', 'cssmin', 'htmlmin' ]);
    grunt.registerTask( 'deploy',     [ 'ftp_upload:htmlcss' ]);
    grunt.registerTask( 'deploy:all', [ 'ftp_upload:all' ]);

};