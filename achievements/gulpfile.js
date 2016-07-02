const gulp = require('gulp');
const rimraf = require('rimraf');
const path = require('path');
const plumber = require('gulp-plumber');
const handlebars = require('gulp-compile-handlebars');
const sass = require('gulp-sass');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const ghPages = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();

const SRC_ROOT = path.resolve(__dirname);
const DIST = path.join(SRC_ROOT, 'dist');
const IMAGES_PATH = path.join(SRC_ROOT, 'images', '**/*.*');
const HBS_PATH = path.join(SRC_ROOT, 'index.hbs');

gulp.task('default', ['clean', 'html', 'images', 'scss', 'watch', 'serve']);
gulp.task('build', ['clean', 'html', 'images', 'scss']);

gulp.task('clean', cb => rimraf(path.join(DIST, '**', '*.*'), cb));

gulp.task('html', () => {
    delete require.cache[require.resolve('./achievements')];

    return gulp
        .src(HBS_PATH)
        .pipe(handlebars({ achievements: require('./achievements')() }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(DIST));
});

gulp.task('images', () => {
    return gulp
        .src(IMAGES_PATH, { base: SRC_ROOT })
        .pipe(gulp.dest(DIST));
});

gulp.task('scss', () => {
    return gulp
        .src(path.join(SRC_ROOT, 'styles', 'main.scss'))
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ]))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(DIST));
});

gulp.task('watch', () => {
    gulp.watch(path.join(SRC_ROOT, 'styles', '**', '*.scss'), ['scss']);
    gulp.watch(IMAGES_PATH, ['images']);
    gulp.watch([HBS_PATH, path.join(SRC_ROOT, 'achievements.js')], ['html']);
});

gulp.task('serve', () => {
    browserSync
        .init({
            port: process.env.PORT || 3000,
            server: DIST,
            files: path.join(DIST, '**', '*.*')
        });
});

gulp.task('deploy', ['clean', 'build'], function() {
    return gulp.src(path.join(DIST, '**', '*.*'))
        .pipe(ghPages());
});
