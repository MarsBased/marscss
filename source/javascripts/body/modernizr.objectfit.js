import Modernizr from 'modernizr';

(function () {
  'use strict';

  //FIX OLD EDGE AND IE
  if (!Modernizr.objectfit) {

    var $imagesCover = $('img').filter(function () {
      return $(this).css('background-size') == 'cover';
    })

    $imagesCover.each(function(){
      var url = $(this).prop('src');

      $(this)
        .css('padding-left', '100%')
        .css('background-position', 'center center')
        .css('background-size', 'cover')
        .css('overflow', 'hidden')
        .css('background-image', 'url("'+url+'")')
    });
  }

})();
