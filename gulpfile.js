import gulp from "gulp";
import htmlmin from 'gulp-htmlmin';
import del from 'del';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename'
import browser from 'browser-sync';


const SOURCE_DIR = 'src';
const BUILD_DIR = 'build';

const PATH = {
    build: {
        html: BUILD_DIR + "/",
        css: BUILD_DIR + "/css/",
        images: BUILD_DIR + "/img/",
        fonts: BUILD_DIR + "/fonts/",
    },
    source: {
        html: SOURCE_DIR + '/*.html',
        scss: SOURCE_DIR + '/scss/style.scss',
        images: SOURCE_DIR + '/img/**/*.{png,jpg}',
        fonts: SOURCE_DIR + '/fonts/*.{woff2,woff}',
        ico: SOURCE_DIR + '/*.ico',
    }
}

// Clean build
const clean = () => {
  return del(BUILD_DIR);
};

// Copy others
const copy = (done) => {
  gulp.src([
    PATH.source.fonts,
    PATH.source.ico,
  ], {
    base: SOURCE_DIR
  })
    .pipe(gulp.dest(BUILD_DIR))
  done();
}

// Styles
const styles = () => {
  return gulp.src(PATH.source.scss, { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(PATH.build.css, { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
    return gulp.src(PATH.source.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(BUILD_DIR));
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: BUILD_DIR
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload Server
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch(`${SOURCE_DIR}/sass/**/*.scss`, gulp.series(styles));
  gulp.watch(`${SOURCE_DIR}/*.html`, gulp.series(html, reload));
}


// Production Build
// export const build = gulp.series()

// Development Build
export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    html
  ),
  gulp.series(
  server,
  watcher
));
