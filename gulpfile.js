/*=== Gulp file for Infosites. ===*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var includer = require('gulp-htmlincluder');

var shell = require('gulp-shell');

// Infosite Sass Compiler
gulp.task('infosite-sass', function (){
	gulp.src(['./Infosite/scss/*.scss'])
		.pipe(sass({
			includePaths: ['./Infosite/scss/']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("style.css"))
		.pipe(gulp.dest('./Infosite/css/'));
});


// Infosite HTML Compiler
gulp.task('infosite-htmlIncluder', function() {
    gulp.src('./Infosite/html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('./Infosite/dist-html/'));
});


// Infosite Watch //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-watch', function(){
	gulp.watch("./Infosite/scss/**/*.scss", function(event){
		gulp.run('infosite-sass');
	});

	gulp.watch(['./Infosite/html/*.html'], function(event) {
      gulp.start('infosite-htmlIncluder');
    });
});



// Infosite Build //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-build', function(){
	gulp.run('infosite-sass');
	gulp.run('infosite-htmlIncluder');
});
