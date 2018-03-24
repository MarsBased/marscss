(function () {
  'use strict';

  $('[data-click-is-active]').on('click', function(){
    $(this).toggleClass('is-active');
  });

})();
