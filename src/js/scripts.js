//Script spécifiques au thème "AlexGraphicDesigner"

function scrolled(){
  //On récupère la valeur du scroll
  var scrollVal = $(document).scrollTop();

  if (scrollVal > 50){
    $('#header').addClass("scrolled");
  }else{
    $('#header').removeClass("scrolled");
  }
}


jQuery(document).ready(function($){

  scrolled();

  //On execute la fonction qui doit s'executer au scroll
  $(document).scroll(function() {
      scrolled();
  });

  //Gestion des cookies
  if ($.cookie('cookieblock') === undefined)  {

    //On affiche le bloc
    $('#cookies').fadeIn(300);

    //masquer le bloc = j'accepte les cookies
    $('#cookie-btn-ok').click(function(e){
      e.preventDefault();
      $('#cookies').fadeOut(300);
      $.cookie('cookieblock', 'viewed', {expires: 30 * 12});
    })

    //masquer le bloc = je refuse les cookies
    $('#cookie-btn-ko').click(function(e){
      e.preventDefault();
      $('#cookies').fadeOut();
      $.cookie('cookieblock', 'viewed', {expires: 30 * 12});
      $.cookie('cookiecancel', '1', {expires: 30 * 12});
    })

  }

  if ($.cookie('cookiecancel') === undefined)  {
    //Code analytics
  }

});
