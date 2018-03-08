var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
prefixer = require('gulp-autoprefixer'),
runSeq = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps'),
cleanCSS = require('gulp-clean-css'),
stylefmt = require('gulp-stylefmt'),
rename = require('gulp-rename');


gulp.task('scripts', function() {
  return gulp.src(['./resources/**/*'])
    .pipe(builder({
        version: 'v0.9.2',
        platforms: ['win64']
     }));
});

// Configure the browserSync task
gulp.task('browserSync', ['live'], function() {
	return browserSync.init({
		server: {
			baseDir: 'src',
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
	.pipe(prefixer())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());

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

	return gulp.src(['src/img/**/*.webm','src/img/**/*.mp4'])
	.pipe(gulp.dest('dist/img'));
});

gulp.task('reload', function(){
	return browserSync.reload();
})

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
	gulp.watch(['src/css/*.css'],['css']);
	gulp.watch('src/*.html', ['reload']);
	gulp.watch(['src/js/**/*.js','src/js/*.js'], browserSync.reload);
});
