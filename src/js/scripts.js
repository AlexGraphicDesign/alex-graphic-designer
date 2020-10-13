//Script spécifiques au thème "AlexGraphicDesigner"

jQuery(document).ready(function($){

  scrolled();
  setMain();
  smoothScroll();
  setSlider();
  setHomeHeight();
  backToTop();

  //On execute la fonction qui doit s'executer au scroll
  $(document).scroll(function() {
      scrolled();
  });

  //On appelle la/les fonction(s) qui doit s'éxécuter au resize
  $(window).resize(function(e) {
      setMain();
      setHomeHeight();
  });

});

//Fonction qui détermine si on as scrollé ou non, on effectue des actions selon le cas
function scrolled(){
  //On récupère la valeur du scroll
  var scrollVal = $(document).scrollTop();
  if (scrollVal > $('#header').outerHeight()){
    $('body').addClass("scrolled");
  }else{
    $('body').removeClass("scrolled");
  }
}

//Fonction qui permets de fixer le footer en bas de la page
function setMain(){
  $("#main-content").css({
    'min-height' : $(window).innerHeight() - $('#footer').outerHeight(),
    'padding-top' : $('#header').outerHeight()
  });
}

//On initialise le slider
function setSlider(){
  if ($("#home-slider").length) {
    var slider = tns({
      "container": "#home-slider",
      "items": 1,
      "lazyload": true,
      "lazyloadSelector": ".bgImg-lazy",
      "mouseDrag": true,
      "swipeAngle": false,
      "controls": false,
      "speed": 400,
      "nav": false,
      "autoplay": true,
      "center": true,
      "autoplayHoverPause": true,
      "autoplayTimeout": 5000,
      "autoplayButtonOutput": false,
      "preventScrollOnTouch": 'auto'
    })
  }
}

//On met la section du slider à 100% du viewport
function setHomeHeight(){
  $('.home').css({
    'height' : $(window).innerHeight() - $('#header').outerHeight()
  });
}

// Bouton retour haut de page
function backToTop(){
  var pxShow = 200,
      fadeInTime = 400,
      fadeOutTime = 400,
      goTopButton = $(".back-to-top")

  $(window).on('scroll', function () {
      if ($(window).scrollTop() >= pxShow) {
          goTopButton.fadeIn(fadeInTime);
      } else {
          goTopButton.fadeOut(fadeOutTime);
      }
  });
}

//Smoothscroll
function smoothScroll(){
  $('.smoothScroll').on('click', function (e) {
      var target = this.hash,
          $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 1000, 'swing', function () {
          window.location.hash = target;
      });
  });
}
