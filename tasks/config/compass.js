 module.exports = function (grunt) {
    grunt.config.set('compass', {
    	dev : {
    		options : {
    			config 	: 'assets/config.rb'
    		}	
    	} 
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
  };