//Gulpfile "alex-graphic-designer" theme


//On appelle Gulp
const {src, dest, task, series, parallel, watch, lastRun} = require("gulp");


//Plugins
const sass = require("gulp-sass"),
      del = require("del"),
      plumber = require("gulp-plumber"),
      autoprefixer = require("autoprefixer"),
      postcss = require('gulp-postcss'),
      cssbeautify = require("gulp-cssbeautify"),
      cleanCSS = require ("gulp-clean-css"),
      concat = require("gulp-concat"),
      browserSync = require("browser-sync").create();


//Chemins fichiers sources et de destination
const paths = {

  js: {
    src: ['node_modules/bootstrap/dist/js/*.js', 'src/js/*.js'],
    dest: './js'
  },
  css: {
      src: ['src/scss/*.scss', 'src/scss/**/*.scss'],
      dest: './css'
  }

}

//----------------------------------------------------------------
// TACHES DE DEV
//----------------------------------------------------------------

function clean(){
    return del([paths.css.dest, paths.js.dest])
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
  //return src([paths.srcStyleCss, paths.srcBootstrapCss], {sourcemaps: true})
  return src(paths.css.src, {sourcemaps: true})
  .pipe(plumber())
  .pipe(sass({
    errLogToConsole: true
  }))
  .on( 'error', console.error.bind( console ) )
  .pipe(postcss([ autoprefixer() ]))
  .pipe(cssbeautify({indent: '  '})) //indentation de deux espaces
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest(paths.css.dest, {sourcemaps: '.'}))
  .pipe(browserSync.stream());
  done();
}

//Compilation du Javascript de developpement
function gulpJS(done){
  return src(paths.js.src)
  .pipe(plumber())
  .pipe(concat('scripts.js'))
  .pipe(dest(paths.js.dest))
  .pipe(browserSync.stream() );
  done();
}

//On écoute les modifications de fichiers pour rechargement de la page automatique
function gulpWatch(){
  watch(paths.css.src, series(gulpStyle, gulpReload));
  watch(paths.js.src, series(gulpJS, gulpReload));
}

//On liste les tâches
exports.buildDev = parallel(gulpWatch, gulpBrowserSync);
exports.default = series(clean, parallel(gulpStyle, gulpJS));
