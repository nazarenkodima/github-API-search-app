let gulp = require('gulp'),
    useref = require('gulp-useref'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-clean-css'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

let config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Keep going!"
};


gulp.task('server', function () {
    browserSync(config);
});

let paths = {
    build: {
        html: 'build/',
        styles: 'build/css',
        js: 'build/js/'
    },
    js: [
        './app/js/**/*.js',
        './app/src/**/*.js'
    ],
    styles: [
        './app/**/*.sass'
    ],
    html: [
        'index.html',
        './app/**/*.html'
    ],
    watch: {
        html: [
            'index.html',
            './app/**/*.html'
        ]
    }
};

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream: true}));
});

gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(useref())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('build', ['html', 'js', 'styles']);


gulp.task('watch', function(){
    gulp.watch([paths.watch.html], function(event, cb) {
        gulp.start('html');
    }),
        gulp.watch([paths.styles], function(event, cb) {
            gulp.start('styles');
        }),
       gulp.watch([paths.js], function(event, cb) {
            gulp.start('js');
        });
});


gulp.task('start', ['build', 'server', 'watch']);
