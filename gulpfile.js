//Gulpfile "alex-graphic-designer" theme


//On appelle Gulp
const {src, dest, task, series, parallel, watch, lastRun} = require("gulp");


//Plugins
const sass = require("gulp-sass"),
      del = require("del"),
      plumber = require("gulp-plumber"),
      rename = require("gulp-rename"),
      uglify = require("gulp-uglify"),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cleancss = require ("gulp-clean-css"),
      imagemin = require("gulp-imagemin"),
      concat = require("gulp-concat"),
      sourcemap = require("gulp-sourcemaps"),
      browserSync = require("browser-sync").create();


//Chemins fichiers sources et de destination
const paths = {

  js: {
    src: ['./src/js/*.js'],
    dest: './js'
  },
  css: {
      src: ['./src/scss/*.scss', './src/scss/**/*.scss'],
      dest: './css'
  },
  images: {
      src: ['./src/img/**/*'],
      dest: './images'
  },
  twig:{
    src: ['./templates']
  }

}

//----------------------------------------------------------------
// TACHES DE DEV
//----------------------------------------------------------------

function clean(){
    return del([paths.css.dest, paths.js.dest, paths.images.dest])
}

//BrowserSync, création d'un serveur local
function gulpBrowserSync(){
     browserSync.init({
        watch: true,
        proxy: 'http://gravalextheme.ddev.site/' // URL ici
     });
}

//Refresh automatique à chaque enregistrement
function gulpReload(done){
  browserSync.reload();
	done();
}

//Compilation du SASS de developpement
function gulpStyle(done){
  return src(paths.css.src)
    .pipe(plumber())
    .pipe(sourcemap.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cleancss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemap.write('./'))
    .pipe(dest(paths.css.dest))
    .pipe(browserSync.stream())
    done();
}

//Compilation du Javascript de developpement
function gulpJS(done){
  return src(paths.js.src)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemap.write())
    .pipe(dest(paths.js.dest))
    .pipe(browserSync.stream())
    done();
}

//Minification des images
function gulpImg(done){
    return src(paths.images.src, {since: lastRun(gulpImg)} )
    .pipe(imagemin())
    .pipe(dest(paths.images.dest))
    done();
}

//On écoute les modifications de fichiers pour rechargement de la page automatique
function gulpWatch(){
  watch(paths.images.src, series(gulpImg, gulpReload));
  watch(paths.css.src, series(gulpStyle, gulpReload));
  watch(paths.js.src, series(gulpJS, gulpReload));
  watch(paths.twig.src, gulpReload);
}

//On liste les tâches
exports.buildDev = parallel(gulpWatch, gulpBrowserSync);
exports.default = series(clean, parallel(gulpStyle, gulpJS, gulpImg));
