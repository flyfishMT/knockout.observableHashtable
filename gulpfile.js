const gulp = require('gulp');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const del = require('del');


gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', function() {
    return gulp.src('src/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(minify({
        src: '.js',
        min: '.min.js'
    }))
    .pipe(gulp.dest('dist'))
});


gulp.task('default', ['build'], function() {

});