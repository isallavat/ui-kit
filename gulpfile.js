const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const replace = require('gulp-replace')

function compileSass () {
  return gulp.src(['src/**/*.scss', '!src/**/mixins.scss', '!src/index.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
}

function compileBabel () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(replace('.scss', '.css'))
    .pipe(gulp.dest('dist'))
}

exports.compileSass = compileSass
exports.compileBabel = compileBabel
exports.default = gulp.parallel(compileSass, compileBabel)
