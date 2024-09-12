const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

// Compilar e minificar os arquivos SCSS
function compileSass() {
return gulp.src('src/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/css'));
}

// Minificar os arquivos HTML
function minifyHTML() {
return gulp.src('src/**/*.html')
    .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
    }))
    .pipe(gulp.dest('build'));
}

// Iniciar o servidor de desenvolvimento
function startServer() {
livereload.listen();
gulp.watch('src/**/*.scss', gulp.series(compileSass));
gulp.watch('src/**/*.html', gulp.series(minifyHTML));
}

// Tarefas do Gulp
exports.default = gulp.series(compileSass, minifyHTML, startServer);