var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('buildandtest', shell.task([
  'browserify -t [ babelify --presets [ react es2015 ] ] app.js -o bundle.js',
  'node_modules/mocha/bin/mocha --compilers js:babel-register'
]));

gulp.task('default', function() {
    gulp.watch(['*.js', 'test/*.js'], ['buildandtest']);
});
