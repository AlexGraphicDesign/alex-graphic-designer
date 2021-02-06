// Script Masonry 'perso'

jQuery(document).ready(function($){

  resizeAllMasonryItems();
  waitForImages();

  //On appelle la/les fonction(s) qui doit s'éxécuter au resize
  $(window).resize(function(e) {
    resizeAllMasonryItems();
  });

});


//Masonry

//Calcul de la hauteur de chaque tuile
function resizeMasonryItem(item){
  var grid = $('.masonry-container'),
      rowGap = parseInt(grid.css('grid-row-gap')),
      rowHeight = parseInt(grid.css('grid-auto-rows')),
      itemMasonry = $(item).find('.blog__item');

  var rowSpan = Math.ceil((itemMasonry.height()+rowGap)/(rowHeight+rowGap));
  item.style.gridRowEnd = 'span '+ rowSpan;
}


//On charge la fonction resizeMasonryItem() quand toutes les images sont chargées
function waitForImages(){
  var allItems = $('.masonry-item');
  for(var i=0;i<allItems.length;i++){
    imagesLoaded( allItems[i], function(instance) {
      var item = instance.elements[0];
      resizeMasonryItem(item);
    });
  }
}


//On redimensionne tous les items
function resizeAllMasonryItems(){
  var allItems = $('.masonry-item');
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}
