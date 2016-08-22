const ENV = 'dev';
module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			data: {
				files: ['source/assets/data/*'],
				tasks: ['copy:data']
			},
			php: {
				files: ['source/**/*.php'],
				tasks: ['copy:php']
			},
			sass: {
				files: ['source/assets/sass/**/*.{sass,scss}'],
				tasks: ['sass:dev']
			},
			js: {
				files: ['source/assets/es6/*.es6'],
				tasks: ['babel:dev']
			},
			jsLib: {
				files: ['source/assets/es6/lib/**/*'],
				tasks: ['copy:jsLib']
			}
		},
		copy: {
			data: {
				files: [
					{
						expand: true,
						cwd: 'source/assets/data',
						src: ['*'],
						dest: ENV+'/assets/data'
					}
				]
			},
			php: {
				files: [
					{
						expand: true,
						cwd: 'source/',
						src: ['*.php','parts/*.php'],
						dest: ENV,
						ext: '.php'
					},
				],
			},
			jsLib: {
				files: [
					{
						expand: true,
						cwd: 'source/assets/es6/lib',
						src: ['**/*'],
						dest: ENV+'/assets/js/lib',
					},
				],
			}
		},
		sass: {
			dev: {
				options: {
					sourcemap: 'file',
					style: 'expanded'
				},
				files: [
					{
						expand: true,
						cwd: 'source/assets/sass',
						src: ['main.sass'],
						dest: ENV+'/assets/css/',
						ext: ENV == 'dev' ? '.css' : '.min.css'
					},
				],
			}
		},
		babel: {
			dev: {
				options: {
					presets: ['es2015','react']
				},
				files: [
					{
						expand: true,
						cwd: 'source/assets/es6',
						src: ['*.es6'],
						dest: ENV+'/assets/js/',
						ext: ENV == 'dev' ? '.js' : '.min.js'
					},
				],
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['copy:data','copy:php','copy:jsLib','sass:dev','babel:dev']);
}