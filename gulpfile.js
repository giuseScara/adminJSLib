var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var size = require('gulp-size');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['images','scripts', 'styles'], function() {
  gulp.watch('dev/scripts/**/*.js', ['scripts']);
  gulp.watch('dev/scripts/**/*.css', ['styles']);
});

gulp.task('scripts', function() {
  gulp.src('dev/scripts/**/*.js')
    .pipe(stripDebug())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest('html/scripts'));
});

gulp.task('images', function () {
   return gulp.src('dev/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('html/images'));
});

gulp.task('styles', function() {
  gulp.src('dev/styles/**/*.css')
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(size())
    .pipe(gulp.dest('html/styles'));
});