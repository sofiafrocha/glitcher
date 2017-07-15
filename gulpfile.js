var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var distPath = 'assets/dist';
var sassPath = 'assets/scr/scss';

gulp.task('sass', function () {
  return gulp.src(`${sassPath}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${distPath}/css`))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: './',
        }

        // use another server
        // proxy: '',
    });

    gulp.watch(`${sassPath}/**/*.scss`, ['sass']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass']);
