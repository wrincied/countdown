const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');

// ESM-compatible del
const del = async (paths) => {
  const { deleteAsync } = await import('del');
  return deleteAsync(paths);
};

const paths = {
  html: 'src/*.html',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  img: 'src/img/**/*',
  dist: 'dist',
  cssDest: 'dist/css',
  jsDest: 'dist/js',
  imgDest: 'dist/img'
};

// Очистка dist
async function clean() {
  await del([paths.dist]);
}

// Копирование index.html
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

// Копирование JS
function scripts() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.jsDest))
    .pipe(connect.reload());
}

// Копирование изображений
function images() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.imgDest))
    .pipe(connect.reload());
}

// Копирование .nojekyll
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

// Вотчеры
function watchFiles() {
  gulp.watch(paths.html, html);
  gulp.watch(paths.scss, styles);
  gulp.watch(paths.js, scripts);
  gulp.watch(paths.img, images);
}

// Сборка
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, nojekyll));
const dev = gulp.series(build, gulp.parallel(server, watchFiles));

// Экспортируем задачи
exports.clean = clean;
exports.build = build;
exports.default = dev;
