/*=== Gulp file for Infosites. ===*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var includer = require('gulp-htmlincluder');

var shell = require('gulp-shell');

// Infosite Sass Compiler
gulp.task('infosite-sass', function (){
	gulp.src(['./InfositeR/scss/responsive/*.scss'])
		.pipe(sass({
			includePaths: ['./InfositeR/scss/']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("responsive.css"))
		.pipe(gulp.dest('./InfositeR/css/'));
});

// Infosite Sass Compiler
gulp.task('infositeMobile-sass', function (){
	gulp.src(['./InfositeR/scss/mobile/*.scss'])
		.pipe(sass({
			includePaths: ['./InfositeR/scss/']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("mobile.css"))
		.pipe(gulp.dest('./InfositeR/css/'));
});

// Infosite Sass Compiler
gulp.task('infositeDesktop-sass', function (){
	gulp.src(['./InfositeR/scss/desktop/*.scss'])
		.pipe(sass({
			includePaths: ['./InfositeR/scss/']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("desktop.css"))
		.pipe(gulp.dest('./InfositeR/css/'));
});

// Infosite HTML Compiler
gulp.task('infosite-htmlIncluder', function() {
    gulp.src('./InfositeR/html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('.'));
});


// Infosite Watch //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-watch', function(){
	gulp.watch("./InfositeR/scss/responsive/**/*.scss", function(event){
		gulp.run('infosite-sass');
	});

	gulp.watch("./InfositeR/scss/desktop/**/*.scss", function(event){
		gulp.run('infositeDesktop-sass');
	});

	gulp.watch("./InfositeR/scss//mobile**/*.scss", function(event){
		gulp.run('infositeMobile-sass');
	});

	gulp.watch(['./InfositeR/html/*.html'], function(event) {
      gulp.start('infosite-htmlIncluder');
    });
});



// Infosite Build //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-build', function(){
	gulp.run('infosite-sass');
	gulp.run('infositeDesktop-sass');
	gulp.run('infositeMobile-sass');
	gulp.run('infosite-htmlIncluder');
});
