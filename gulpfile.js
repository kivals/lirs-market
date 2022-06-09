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
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import minify from 'gulp-minify';

const SOURCE_DIR = 'src';
const BUILD_DIR = 'build';

const PATH = {
    build: {
        html: BUILD_DIR + "/",
        css: BUILD_DIR + "/css/",
        js: BUILD_DIR + "/js/",
        images: BUILD_DIR + "/img/",
        fonts: BUILD_DIR + "/fonts/",
    },
    source: {
        html: SOURCE_DIR + '/*.html',
        scss: SOURCE_DIR + '/scss/style.scss',
        js: SOURCE_DIR + '/js/*.js',
        images: SOURCE_DIR + '/img/**/**/*.{png,jpg}',
        svg: SOURCE_DIR + '/img/**/*.svg',
        fonts: SOURCE_DIR + '/fonts/*.{woff2,woff}',
        ico: SOURCE_DIR + '/*.ico',
        spriteSvg: SOURCE_DIR + '/img/icons/sprite/*.svg'
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
    SOURCE_DIR + '/css/swiper-bundle.min.css',
    SOURCE_DIR + '/js/swiper/swiper-bundle.min.js',
    SOURCE_DIR + '/robots.txt',
    SOURCE_DIR + '/sitemap.xml',

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

// Images
const optimizeImages = () => {
  return gulp.src(PATH.source.images)
    .pipe(squoosh())
    .pipe(gulp.dest(PATH.build.images))
}

// WebP
const createWebp = () => {
  return gulp.src(PATH.source.images)
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest(PATH.build.images))
}

// SVG
const svg = () => {
  return gulp.src([PATH.source.svg, `!${PATH.source.spriteSvg}`])
    .pipe(svgo())
    .pipe(gulp.dest(PATH.build.images));
}

// SVG sprite
const sprite = () => {
  return gulp.src(PATH.source.spriteSvg)
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(PATH.build.images));
}

// Scripts
const scripts = () => {
  return gulp.src(PATH.source.js)
    .pipe(minify({
      ext:{
        min:'.min.js'
      }
    }))
    .pipe(gulp.dest(PATH.build.js))
    .pipe(browser.stream());
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
  gulp.watch(`${SOURCE_DIR}/scss/**/*.scss`, gulp.series(styles));
  gulp.watch(`${SOURCE_DIR}/js/*.js`, gulp.series(scripts));
  gulp.watch(`${SOURCE_DIR}/*.html`, gulp.series(html, reload));
}


// Production Build
// export const build = gulp.series()

// Development Build
export default gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
  server,
  watcher
));
