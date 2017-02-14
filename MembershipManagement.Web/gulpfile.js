/// <binding BeforeBuild='01-clean' AfterBuild='03-moveToHtmlCss, 02-webpack, 04-moveToLib, 05-moveToRootLib, 06-fonts' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    uglify = require('gulp-uglify'),
    del = require('del');

// variables for source and public directories
var sourceDir = "./src",
    publicDir = "./wwwroot";

var paths = {
    npmSrc: "./node_modules/",
    fontTarget: "./wwwroot/fonts/",
    libTarget: "./wwwroot/lib/"
};

gulp.task('01-clean', function () {
    return del(publicDir + '/*');
});

gulp.task('02-webpack', function () {
    return gulp.src(sourceDir + '/')
        .pipe(webpack({
            entry: {
                app: sourceDir + '/main.browser.ts',
            },
            output: {
                filename: 'main.bundle.js'
            },
            resolve: {
                extensions: ['', 'webpack.config.js', 'web.js', '.ts', '.js']
            },
            module: {
                loaders: [
                    // .ts files for TypeScript
                    {
                        test: /\.ts$/,
                        loaders: [
                            'awesome-typescript-loader',
                            'angular2-template-loader',
                            'angular2-router-loader'
                        ]
                    },
                    { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
                    { test: /\.html$/, loader: 'raw-loader' }
                ]
            }
        }))
        //.pipe(uglify())
        .pipe(gulp.dest(publicDir + '/'))
});


var htmlcssToMove = [
    sourceDir + '/index.html',
    sourceDir + '/default.css',
    sourceDir + '/favicon.ico'
];

gulp.task('03-moveToHtmlCss', function () {
    return gulp.src(htmlcssToMove).pipe(gulp.dest(publicDir + '/'));
});

var bootstrapToMove = [
    paths.npmSrc + '/bootstrap/dist/css/bootstrap.css',
    paths.npmSrc + '/bootstrap/dist/js/bootstrap.js',
    paths.npmSrc + '/jquery/dist/jquery.js'
];

gulp.task('04-moveToLib', function () {
    return gulp.src(bootstrapToMove).pipe(gulp.dest(sourceDir + '/lib'));
});

var libToMove = [
    sourceDir + '/lib/*.*'
];

gulp.task('05-moveToRootLib', function () {
    return gulp.src(libToMove).pipe(gulp.dest(paths.libTarget));
});


gulp.task('06-fonts', function () {
    return gulp.src([
        paths.npmSrc + '/font-awesome/fonts/fontawesome-webfont.*',
        paths.npmSrc + '/bootstrap/fonts/*.*'
    ])
        .pipe(gulp.dest(paths.fontTarget));
});