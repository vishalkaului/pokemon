module.exports = function (grunt) {
	grunt.initConfig({
		// Watch task config
		watch: {
			sass: {
				files: "src/scss/*.scss",
				tasks: ['sass']
			}
		},
		// SASS task config
		sass: {
				dev: {
						files: {
							// destination         // source file
							"src/css/style.css" : "src/scss/style.scss"
						}
					}
				},
		connect: {
			server: {
				options: {
					port: 8000,
					base: {
						path: 'src',
						options: {
						index: 'index.html',
						maxAge: 300000
				  	}
				}
			}
		}
	}
});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
		
	// register a default task.
	grunt.registerTask('default', ['connect', 'watch']);

};