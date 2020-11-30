//Script spécifiques au thème "AlexGraphicDesigner"

jQuery(document).ready(function($){

  scrolled();
  setMain();
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

//On met la section de la home à 100% du viewport
function setHomeHeight(){
  $('.home').css({
    'min-height' : $(window).innerHeight() - $('#header').outerHeight()
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

  goTopButton.on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });
}
