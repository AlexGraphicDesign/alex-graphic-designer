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
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = $('.masonry-container'),
      rowGap = parseInt(grid.css('grid-row-gap')),
      rowHeight = parseInt(grid.css('grid-auto-rows')),
      itemMasonry = $(item).find('.blog__item').get(0);

  /*
   * Spanning for any brick = S
   * Grid's row-gap = G
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil((itemMasonry.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = 'span '+ rowSpan;


}


function resizeAllMasonryItems(){
  var allItems = $('.masonry-item');
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}
