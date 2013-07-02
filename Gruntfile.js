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
};
