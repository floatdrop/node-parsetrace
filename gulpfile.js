'use strict';

var gulp = require('gulp');
var shelljs = require('shelljs');

gulp.task('watch', function () {
    gulp.watch(['test/**', 'lib/**'], function () {
        shelljs.exec('npm test');
    });
});

gulp.task('default', function () {
    gulp.run('watch');
});
