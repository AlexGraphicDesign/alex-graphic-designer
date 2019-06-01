//Script spécifiques au thème "AlexGraphicDesigner"

function scrolled(){
  //On récupère la valeur du scroll
  var scrollVal = $(document).scrollTop();

  if (scrollVal > 70){
    $('#header').addClass("fixed-top");
  }else{
    $('#header').removeClass("fixed-top");
  }

}



jQuery(document).ready(function($){

  scrolled();

  //On execute la fonction qui doit s'executer au scroll
  $(document).scroll(function() {
      scrolled();
  });

  //gestion bandeau cookies
  if ($.cookie('cookieblock') === undefined)  {

    //On affiche le bloc
    $('#cookie').fadeIn(300);

    //masquer le bloc
    $('#cookie-btn-ok').click(function(e){
      e.preventDefault();
      $('#cookie').fadeOut();
      $.cookie('cookieblock', 'viewed', {expires: 30 * 12});
    })
  }

});
