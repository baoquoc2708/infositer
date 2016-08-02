/*=== Gulp file for Infosites. ===*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var includer = require('gulp-htmlincluder');

var shell = require('gulp-shell')

// Infosite Sass Compiler
gulp.task('infosite-sass', function (){
	gulp.src(['./assets/scss/*.scss'])
		.pipe(sass({
			includePaths: ['./assets/scss/']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("style.css"))
		.pipe(gulp.dest('./assets/css/'));
});


// Infosite HTML Compiler
gulp.task('infosite-htmlIncluder', function() {
    gulp.src('./assets/html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('./assets/dist-html/'));
});


// Infosite Watch //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-watch', function(){
	gulp.watch("./assets/scss/**/*.scss", function(event){
		gulp.run('infosite-sass');
	});

	gulp.watch(['./assets/html/*.html'], function(event) {
      gulp.start('infosite-htmlIncluder');
    });
});



// Infosite Build //////////////////////////////////////////////////////////////////////////
gulp.task('infosite-build', function(){
	gulp.run('infosite-sass');
	gulp.run('infosite-htmlIncluder');
});










gulp.task('cme-webpack', shell.task([
  'webpack --progress --optimize-minimize --config webpack.cme.deploy.js',
  'echo world'
]))



// CME Sass Compiler
gulp.task('cme-sass', function (){
	gulp.src(['./products/cme/css/*.scss'])
		.pipe(sass({
			includePaths: ['./products/cme/css']
		}))
		.pipe(autoprefixer({
            browsers: ['not ie <= 8'],
            cascade: false
        }))
        .pipe(rename("cme-video-player.css"))
		.pipe(gulp.dest('./master/images/medcss/cme/coreplayer'));
});


// CME Watch //////////////////////////////////////////////////////////////////////////
gulp.task('cme-watch', function(){
	gulp.watch("./products/cme/css/**/*.scss", function(event){
		gulp.run('cme-sass');
	});
});

// CME Build //////////////////////////////////////////////////////////////////////////
gulp.task('dist-cme', function(){
	gulp.run('cme-sass');
	gulp.run('cme-webpack');
});
