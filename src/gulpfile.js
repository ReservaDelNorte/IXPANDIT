var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(gulp.dest('css'))
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

gulp.task('live', ['html','css','js','assets']);

gulp.task('css', function(){
	gulp.src(['css/**/*.css'])
		.pipe(gulp.dest('../dist/css/'));
});

gulp.task('js', function(){
	gulp.src(['js/**/*.js'])
		.pipe(gulp.dest('../dist/js/'));
});

gulp.task('html', function(){
	gulp.src(['*.html'])
		.pipe(gulp.dest('../dist/'));
});

gulp.task('assets', function(){
	gulp.src(['favicon.ico'])
		.pipe(gulp.dest('../dist/'));

	gulp.src(['img/**/*.gif','img/**/*.png','img/**/*.jpg'])
		.pipe(gulp.dest('../dist/img/'));

	gulp.src(['img/**/*.webm'])
		.pipe(gulp.dest('../dist/img'));
});



// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('css/*.css', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch(['js/**/*.js','js/*.js'], browserSync.reload);
});
