var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('buildandtest', shell.task([
  'tsc src/app.tsx test/modelsTests.ts --jsx react --outDir build/es6 -t ES6',
  'babel build/es6 -d build/es5',
  'browserify build/es5/src/app.js -o build/bundle.js',
  'node_modules/mocha/bin/mocha --compilers js:babel-register'
]));

gulp.task('default', ['buildandtest'], function() {
    gulp.watch(['src/*.ts', 'src/*.tsx','test/*.ts'], ['buildandtest']);
});
