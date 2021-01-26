//Script spécifiques au thème "AlexGraphicDesigner"

jQuery(document).ready(function($){

  scrolled();
  setMain();
  setHomeHeight();
  backToTop();
  jsScroll();
  resizeAllMasonryItems();

  //On execute la fonction qui doit s'executer au scroll
  $(document).scroll(function() {
      scrolled();
  });

  //On appelle la/les fonction(s) qui doit s'éxécuter au resize
  $(window).resize(function(e) {
      setMain();
      setHomeHeight();
      resizeAllMasonryItems();
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
}

//Smoothscroll
function jsScroll(){
  var mainNav_height = $('#header').outerHeight() - 22;
  $('.js-scroll').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "swing");
        return false;
      }
    }
  });
}

//Masonry
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = $('.masonry-container'),
      rowGap = parseInt(grid.css('grid-row-gap')),
      rowHeight = parseInt(grid.css('grid-auto-rows'));

  /*
   * Spanning for any brick = S
   * Grid's row-gap = G
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil((item.querySelector('.blog__item').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = 'span '+ rowSpan;
}


function resizeAllMasonryItems(){
  var allItems = $('.masonry-item');
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}
