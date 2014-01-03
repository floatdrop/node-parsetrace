'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');

gulp.task('mocha', function (cb) {
    gulp.src(['test/*.js'])
        .pipe(mocha({ reporter: 'list' }))
        .on('error', function (err) {
            console.log(err.stack);
            cb();
        })
        .on('end', cb);
});

gulp.task('watch', function () {
    gulp.watch(['test/**', 'lib/**'], batch(function (events, cb) {
        gulp.run('mocha', cb);
    }));
});

gulp.task('default', function () {
    gulp.run('mocha');
    gulp.run('watch');
});
