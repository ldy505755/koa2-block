const gulp = require('gulp')
const changed = require('gulp-changed')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const pump = require('pump')
const babel = require('gulp-babel')
const browserify = require('gulp-browserify')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync')
const del = require('del')

const config = require('./config')

const SRC = {
  styles: 'public/**/*.css',
  scripts: 'public/**/*.js',
  images: 'public/**/*.+(png|jpg)'
}
const DEST = 'dist/'

gulp.task('clean/styles', () => del(['dist/stylesheets']))
gulp.task('clean/scripts', () => del(['dist/javascripts']))
gulp.task('clean/images', () => del(['dist/images']))

gulp.task('styles', ['clean/styles'], () => {
  const callback = () => ({
    plugins: [
      require('postcss-import')({root: 'node_modules'}),
      // require('postcss-modules'),
      require('precss'),
      require('autoprefixer'),
      require('cssnano')
    ]
  })
  if (config.env === 'development') {
    return gulp.src(SRC.styles)
      .pipe(changed(DEST))
      .pipe(sourcemaps.init())
      .pipe(postcss(callback))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DEST))
  }
  return gulp.src(SRC.styles)
    .pipe(postcss(callback))
    .pipe(gulp.dest(DEST))
})

gulp.task('scripts', ['clean/scripts'], cb => {
  const babelOpts = {
    presets: ['@babel/env']
  }
  const browserifyOpts = {
    insertGlobals: true,
    debug: config.env === 'development' ? true : false
  }
  if (config.env === 'development') {
    pump([
      gulp.src(SRC.scripts),
      changed(DEST),
      sourcemaps.init(),
      babel(babelOpts),
      browserify(browserifyOpts),
      uglify(),
      sourcemaps.write('./'),
      gulp.dest(DEST)
    ], cb)
  } else {
    pump([
      gulp.src(SRC.scripts),
      babel(babelOpts),
      browserify(browserifyOpts),
      uglify(),
      gulp.dest(DEST)
    ], cb)
  }
})

gulp.task('images', ['clean/images'], () => {
  return gulp.src(SRC.images)
    .pipe(imagemin())
    .pipe(gulp.dest(DEST))
})

gulp.task('nodemon', ['styles', 'scripts', 'images'], () => {
  nodemon({
    script: 'bin/www.js',
    ignore: [
      'dist/',
      'node_modules/',
      'public/',
      '.eslintrc.js',
      'gulpfile.js'
    ]
  })
})

gulp.task('start', ['nodemon'], () => {
  browserSync.init({
    files: [
      'config/**/*.js',
      'controllers/**/*.js',
      'middlewares/**/*.js',
      'public/**/*.+(png|jpg|js|css)',
      'routes/**/*.js',
      'utils/**/*.js',
      'views/**/*.html'
    ],
    proxy: `http://localhost:${config.port}`,
    port: 8080,
    open: false,
    notify: false
  })

  gulp.watch(SRC.styles, ['styles'])
  gulp.watch(SRC.scripts, ['scripts'])
  gulp.watch(SRC.images, ['images'])
})

gulp.task('default', ['styles', 'scripts', 'images'])
