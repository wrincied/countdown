const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');

const paths = {
  html: 'src/*.html',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  dist: 'dist',
  cssDest: 'dist/css',
  jsDest: 'dist/js'
};

// HTML
function html() {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());
}

// SCSS → CSS
function styles() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(connect.reload());
}

// JS
function scripts() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.jsDest))
    .pipe(connect.reload());
}

// COPY .nojekyll
function nojekyll() {
  return gulp.src('.nojekyll')
    .pipe(gulp.dest(paths.dist));
}

// Сервер
function server() {
  connect.server({
    root: paths.dist,
    livereload: true
  });
}

// Watch
function watchFiles() {
  gulp.watch(paths.html, html);
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
}

const build = gulp.series( gulp.parallel(html, styles, scripts, nojekyll));
const dev = gulp.series(build, gulp.parallel(server, watchFiles));

exports.build = build;
exports.default = dev;
