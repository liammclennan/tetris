var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('buildandtest', shell.task([
  'tsc src/app.tsx --jsx react --outDir build/es6 -t ES6',
  'babel build/es6 -d build/es5',
  'browserify build\\es5\\app.js -o build\\bundle.js'
]));

gulp.task('default', ['buildandtest'], function() {
    gulp.watch(['src/*.ts', 'src/*.tsx'], ['buildandtest']);
});
