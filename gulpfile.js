var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
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
	gulp.src(['src/css/**/*.css'])
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('js', function(){
	gulp.src(['src/js/**/*.js'])
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('html', function(){
	gulp.src(['src/*.html'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('assets', function(){
	gulp.src(['src/favicon.ico'])
		.pipe(gulp.dest('dist/'));

	gulp.src(['src/img/**/*.gif','src/img/**/*.png','src/img/**/*.jpg'])
		.pipe(gulp.dest('dist/img/'));

	gulp.src(['src/img/**/*.webm'])
		.pipe(gulp.dest('dist/img'));
});



// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('src/css/*.css', browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch(['src/js/**/*.js','src/js/*.js'], browserSync.reload);
});
