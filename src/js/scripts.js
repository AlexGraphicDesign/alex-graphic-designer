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
  //On execute la fonction
  scrolled();

  $(document).scroll(function() {
      scrolled();
  });

});
