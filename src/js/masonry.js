// Script Masonry 'perso'

jQuery(document).ready(function($){

  resizeAllMasonryItems();

  //On appelle la/les fonction(s) qui doit s'éxécuter au resize
  $(window).resize(function(e) {
  });

});


//Masonry
//Calcul de la hauteur de chaque tuile
function resizeMasonryItem(item){

  var grid = $('.masonry-container'),
      rowGap = parseInt(grid.css('grid-row-gap')),
      rowHeight = parseInt(grid.css('grid-auto-rows')),
      itemMasonry = $(item).find('.blog__item').get(0);

  var rowSpan = Math.ceil((itemMasonry.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

  item.style.gridRowEnd = 'span '+ rowSpan;

}


function resizeAllMasonryItems(){

  var allItems = $('.masonry-item');
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }

}
