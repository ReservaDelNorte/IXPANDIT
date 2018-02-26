var gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		prefixer = require('gulp-autoprefixer'),
		runSeq = require('run-sequence'),
		sourcemaps = require('gulp-sourcemaps'),
		cleanCSS = require('gulp-clean-css'),
		stylefmt = require('gulp-stylefmt');

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
    	baseDir: 'dist',
    	serveStaticOptions: {
        	extensions: ["html"]
    	}
    },

  })
})

gulp.task('live', ['html','css','js','assets']);

gulp.task('css', function(){

	return gulp.src(['src/css/**/*.css'])
		.pipe(sourcemaps.init())
		.pipe(stylefmt())
		//.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(prefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
	return gulp.src(['src/js/**/*.js'])
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function(){
	return gulp.src(['src/*.html'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('assets', function(){
	gulp.src(['src/favicon.ico'])
		.pipe(gulp.dest('dist/'));

	gulp.src(['src/img/**/*.gif','src/img/**/*.png','src/img/**/*.jpg'])
		.pipe(gulp.dest('dist/img/'));

	return gulp.src(['src/img/**/*.webm'])
		.pipe(gulp.dest('dist/img'));
});

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('src/css/*.css', function(){
		runSeq('css', browserSync.reload);
	});
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch(['src/js/**/*.js','src/js/*.js'], browserSync.reload);
});
