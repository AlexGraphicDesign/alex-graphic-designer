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
      srcCss : 'src/scss/*.scss',
      srcComposantsCss : 'src/scss/**/*.scss',

      srcJs: 'src/js/*.js',
      srcBootstrapJs: 'node_modules/bootstrap/dist/js/*.js',

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
function gulpSass(done){
  return src(paths.srcCss, {sourcemaps: true})
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
  watch([paths.srcCss, paths.srcComposantsCss], series(gulpSass, gulpReload));
  watch([paths.srcBootstrapJs, paths.srcJs], series(gulpJS, gulpReload));
}

//On liste les tâches
task("gulpSass", gulpSass);
task("gulpJS", gulpJS);
task("default", series(clean, parallel(gulpSass, gulpJS)));
task("build-dev", parallel(gulpBrowserSync, gulpWatch));
