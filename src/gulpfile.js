'use strict';

var gulp = require('gulp');
var del = require('del');



// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),
    
    sourceFile = './scripts/app.js',
    
    destFolder = '../App',
    destFileName = 'app.js';

// HTML
gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('../App'));
});

// Scripts
gulp.task('scripts', function () {
    var bundler = watchify(browserify({
        entries: [sourceFile],
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source(destFileName))
            .pipe(gulp.dest(destFolder));
    }

    gulp.src('./scripts/index.js')
        .pipe(gulp.dest('../App'));

    return rebundle();

});

// Images
gulp.task('images', function () {
    return gulp.src('./images/**/*')
        .pipe(gulp.dest('../App/images'))
});

// Webserver
gulp.task('serve', function () {
    gulp.src('../App')
        .pipe($.webserver({
            livereload: true,
            port: 9000
        }));
});

// Watch
gulp.task('watch', ['build', 'serve'], function () {
    // Watch script files
    gulp.watch('./scripts/index.js', ['scripts']);

    // Watch image files
    gulp.watch('./images/**/*', ['images']);

    // Watch html files
    gulp.watch('./index.html', ['html']);
});

// Clean
gulp.task('clean', function (cb) {
    cb(del.sync(['../App/*'], { force: true }));
});

// Build
gulp.task('build', ['scripts', 'images', 'html']);

// Default task
gulp.task('default', ['clean', 'build']);
