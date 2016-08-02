var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var includer = require('gulp-htmlincluder');

var shell = require('gulp-shell')

// Brand Advance Sass Compiler
gulp.task('ba-sass', function (){
	gulp.src(['./products/brandadvance/scss/*.scss'])
		.pipe(sass({
			includePaths: ['./products/brandadvance/scss']
		}))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename("style.css"))
		.pipe(gulp.dest('./products/brandadvance/master/images/medcss/features/ba2'));
});


// Brand Advance HTML Compiler
gulp.task('ba-htmlIncluder', function() {
    gulp.src('./products/brandadvance/html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('./products/brandadvance/dist-html/'));
});

// Brand Advance JS Compiler
gulp.task('ba-js', function() {
    gulp.src('./products/brandadvance/js/*.js')
        .pipe(gulp.dest('./products/brandadvance/master/images/pi/scripts/ba2/'));
});

// Brand Advance Assets
gulp.task('ba-assets', function() {
    gulp.src('./products/brandadvance/assets/*/**')
        .pipe(gulp.dest('./products/brandadvance/master/images/pi/sp/ipp/7/14480/'));
});




// Brand Advance Watch //////////////////////////////////////////////////////////////////////////
gulp.task('ba-watch', function(){
	gulp.watch("./products/brandadvance/scss/**/*.scss", function(event){
		gulp.run('ba-sass');
	});

	gulp.watch(['./products/brandadvance/html/*.html'], function(event) {
      gulp.start('ba-htmlIncluder');
    });
});



// Brand Advance Build //////////////////////////////////////////////////////////////////////////
gulp.task('ba-build', function(){
	gulp.run('ba-sass');
	gulp.run('ba-htmlIncluder');
	gulp.run('ba-js');
	gulp.run('ba-assets');
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
