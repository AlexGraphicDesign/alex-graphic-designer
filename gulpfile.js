//Gulpfile "alex-graphic-designer" theme


//On appelle Gulp
const {src, dest, task, series, parallel, watch} = require("gulp");


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
      srcBootstrapCss : 'src/scss/bootstrap.scss',
      srcBootstrapJs: 'node_modules/bootstrap/dist/js/*.js',

      srcStyleCss : 'src/scss/style.scss',
      srcComposantsCss : 'src/scss/**/*.scss',

      srcJs: 'src/js/*.js',

      distCss : "css",
      distJs: "js"
}

//----------------------------------------------------------------
// TACHES DE DEV
//----------------------------------------------------------------

function clean(){
    return del([paths.distCss, paths.distJs])
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
  return src([paths.srcStyleCss, paths.srcBootstrapCss], {sourcemaps: true})
  .pipe(plumber())
  .pipe(sass({
    errLogToConsole: true
  }))
  .on( 'error', console.error.bind( console ) )
  .pipe(postcss([ autoprefixer() ]))
  .pipe(cssbeautify({indent: '  '})) //indentation de deux espaces
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest(paths.distCss, {sourcemaps: '.'}))
  .pipe(browserSync.stream());
  done();
}

//Compilation du Javascript de developpement
function gulpJS(done){
  return src([paths.srcBootstrapJs, paths.srcJs])
  .pipe(plumber())
  .pipe(concat('scripts.js'))
  .pipe(dest(paths.distJs))
  .pipe(browserSync.stream() );
  done();
}

//On écoute les modifications de fichiers pour rechargement de la page automatique
function gulpWatch(){
  watch([paths.srcBootstrapCss, paths.srcStyleCss, paths.srcComposantsCss], series(gulpStyle, gulpReload));
  watch([paths.srcBootstrapJs, paths.srcJs], series(gulpJS, gulpReload));
}

//On liste les tâches
task("gulpStyle", gulpStyle);
task("gulpJS", gulpJS);
task("default", series(clean, parallel(gulpStyle, gulpJS)));
task("build-dev", parallel(gulpBrowserSync, gulpWatch));
