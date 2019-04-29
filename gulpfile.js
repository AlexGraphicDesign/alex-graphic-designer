//Gulpfile "alex-graphic-designer" theme


//On appelle Gulp
const {src, dest, task, series, parallel, watch} = require("gulp");


//Plugins
const sass = require("gulp-sass"),
      del = require("del"),
      plumber = require("gulp-plumber"),
      cssautoprefixer = require("gulp-autoprefixer"),
      cssbeautify = require("gulp-cssbeautify"),
      cleanCSS = require ("gulp-clean-css"),
      concat = require("gulp-concat"),
      browserSync = require("browser-sync").create();


//Chemins fichiers sources et de destination
const paths = {
      srcBootstrap : 'node_modules/bootstrap/scss/*.scss',
      srcBootstrapComposants : 'node_modules/bootstrap/scss/**/*.scss',
      srcCustomCss : 'src/scss/*.scss',
      srcCustomComposantsCss : 'src/scss/**/*.scss',

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
        proxy: 'http://gravalextheme.ddev.local', // URL ici
        ghostMode: false,
        open: false,
        notify: false
     });
}

//Refresh automatique à chaque enregistrement
function gulpReload(done){
  browserSync.reload();
	done();
}

//Compilation du SASS de developpement
function gulpSass(done){
  return src(paths.srcCustomCss, {sourcemaps: true})
  .pipe(plumber())
  .pipe(sass({
    errLogToConsole: true
  }))
  .on( 'error', console.error.bind( console ) )
  .pipe(cssautoprefixer({
          browsers: ['> 0%']
   }))
  .pipe(cssbeautify({indent: '  '})) //indentation de deux espaces
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
  watch([paths.srcBootstrap, paths.srcBootstrapComposants, paths.srcCustomCss, paths.srcCustomComposantsCss], series(gulpSass, gulpReload));
  watch([paths.srcBootstrapJs, paths.srcJs], series(gulpJS, gulpReload));
}

//On liste les tâches
task("gulpSass", gulpSass);
task("gulpJS", gulpJS);
task("default", series(clean, parallel(gulpSass, gulpJS)));
task("build-dev", parallel(gulpBrowserSync, gulpWatch));
