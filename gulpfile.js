var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var size = require('gulp-size');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

var bower = require("gulp-bower");
var clean = require('gulp-clean');

gulp.task('default', ['bower','libJS','libCSS'], function() {
  //gulp.watch('dev/scripts/**/*.js', ['scripts']);
  //gulp.watch('dev/scripts/**/*.css', ['styles']);
});

gulp.task('bower', function() {
  return bower();
});


gulp.task('clean', function () {
    return gulp.src(['dev/js/lib/*', 'dev/css/lib/*'], {read: false})
        .pipe(clean());
});

gulp.task('libJS', function () {
  var libJS = [
    'bower_components/angular/angular.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.min.js',
    'bower_components/requirejs/require.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/require-css/css.min.js',
    'bower_components/vis/dist/vis.min.js'];
   return gulp.src(libJS)
      .pipe(gulp.dest('dev/js/lib'));
});

gulp.task('libCSS', function () {
  var libCSS = [
    'bower_components/vis/dist/vis.min.css',
    'bower_components/bootstrap/dist/css/bootstrap.css'];
   return gulp.src(libCSS)
      .pipe(gulp.dest('dev/css/lib'));
});

gulp.task('concatLib', function() {
  gulp.src('dev/js/lib/*.js')
  .pipe(concat('lib.js'))
  .pipe(gulp.dest('dev/js'));

  gulp.src('dev/css/lib/*.css')
  .pipe(concat('lib.css'))
  .pipe(gulp.dest('dev/css'));
});

gulp.task('bower', function() {
  return bower('./bower_components');
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
