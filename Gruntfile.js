var path = require('path');

module.exports = function (grunt) {

// -- Config -------------------------------------------------------------------

grunt.initConfig({

    pkg      : grunt.file.readJSON('package.json'),

    // -- Constants ------------------------------------------------------------

    BUILD_COMMENT: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    
    'jsfiles_src'  : 'src/js/**/*.js',
    'cssfiles_src' : 'src/css/**/*.css',
    'jsfiles_dest' : 'build/scripts/',
    'cssfiles_dest': 'build/styles/',
    

    // -- Clean Config ---------------------------------------------------------

    clean: {
        pre : ['build/']
    },

    // -- Copy Config ----------------------------------------------------------

    copy: {
        scripts: {
        	expand : true,
            flatten: true,
        	src: '<%= jsfiles_src %>',
        	dest: '<%= jsfiles_dest %>'
        },
        styles: {
        	expand : true,
            flatten: true,
        	src: '<%= cssfiles_src %>',
        	dest: '<%= cssfiles_dest %>'
        }
    },   

    

    // -- CSSMin Config --------------------------------------------------------

    cssmin: {
        options: {
            banner: '<%= BUILD_COMMENT %>'
        },
        files: {
            expand: true,
            flatten: true,
            src   : ['<%= cssfiles_dest %>**/*.css'],
            //ext   : '-min.js',
            dest  : '<%= cssfiles_dest %>'
        }
    },
    
    // -- JSUglify(Min) Config --------------------------------------------------------

    uglify: {
        options: {
            banner: '<%= BUILD_COMMENT %>'
        },
        files: {
            expand: true,
            flatten: true,
            src   : ['<%= jsfiles_dest %>**/*.js'],
            //ext   : '-min.js',
            dest  : '<%= jsfiles_dest %>'
        }
        
    },    

    // -- Watch/Observe Config -------------------------------------------------

    observe: {
    	options: {
            interrupt: true
        },
    	
    	styles: {
    		files: '<%= jsfiles_src %>',
    		tasks: ['copy:styles', 'cssmin']
    	},
    	
        scripts: {
            files: '<%= cssfiles_src %>',
            tasks: ['copy:scripts', 'uglify']
        }
    }
});

// -- Main Tasks ---------------------------------------------------------------

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('js-build', 'building js files', [
   'copy:scripts',
   'uglify'
]);

grunt.registerTask('css-build', 'building css files', [
 'copy:styles',
 'cssmin'
  ]);

grunt.registerTask('default', [
    'clean:pre',
    'js-build',
    'css-build'
]);


// Makes the `watch` task run a build first.
grunt.renameTask('watch', 'observe');
grunt.registerTask('watch', ['default', 'observe']);

//on watch events configure jshint:all to only run on changed file
grunt.event.on('watch', function(action, filepath) {
	grunt.log.writeln('\n'+ filepath + ' has ' + action);
	
	grunt.config(['copy', 'scripts', 'files', 'src'], filepath);
});

// -- Contextualize Task -------------------------------------------------------

/*grunt.registerMultiTask('contextualize', 'Makes Contextualized CSS files.', function () {
    var Parser     = require('parserlib').css.Parser,
        done       = this.async(),
        options    = this.options({banner: ''}),
        banner     = grunt.template.process(options.banner),
        processing = 0;

    function oneDone() {
        if (!(processing -= 1)) {
            done();
        }
    }

    this.files.forEach(function (filePair) {
        filePair.src.forEach(function (file) {
            var src        = grunt.file.read(file),
                contextual = banner,
                parser     = new Parser();

            parser.addListener('endstylesheet', function () {
                grunt.file.write(filePair.dest, contextual);
                grunt.log.writeln('File "' + filePair.dest + '" created.');
                oneDone();
            });

            // Fired right before CSS properties are parsed for a certain rule.
            // Go through and add all the selectors to the `css` string.
            parser.addListener('startrule', function (event) {
                var prefix = options.prefix;

                event.selectors.forEach(function (selector, i) {
                    var nextSelector = event.selectors[i + 1];

                    // If the selector does not contain the html selector, we
                    // can go ahead and prepend `prefix` in front of it.
                    if (selector.text.indexOf('html') === -1) {
                        contextual += prefix + ' ' + selector.text;
                    } else if (selector.text.indexOf('html') !== -1) {
                        // If it contains `html`, replace the `html` with the
                        // `prefix`. Replace multiple spaces with a single
                        // space. This is for the case where
                        // `html input[type='button']` comes through as
                        // `html    input[type='button']`.
                        contextual += selector.text.replace('html', prefix).replace(/ +/g, ' ');
                    }

                    // If theres another selector, add a comma.
                    if (nextSelector) {
                        contextual += ',\n';
                    } else {
                        // Otherwise, add an opening bracket for properties
                        contextual += ' {\n';
                    }
                });
            });

            // Fired right after CSS properties are parsed for a certain rule.
            // Add the closing bracket to end the CSS Rule.
            parser.addListener('endrule', function (event) {
                contextual += '}\n';
            });

            // Fired for each property that the parser encounters. Add these
            // properties to the `css` string with 4 spaces.
            parser.addListener('property', function (event) {
                // Add 4 spaces tab.
                contextual += '    ' + event.property + ': ' + event.value + ';\n';
            });

            // Do the parsing.
            processing += 1;
            parser.parse(src);
        });
    });
});*/

};
