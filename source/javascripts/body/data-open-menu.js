(function () {
  'use strict';

  $('[data-open-menu]').on('click', function(){
    $(this).toggleClass('is-active');
    $('body').toggleClass('is-menu-open');
  });

})();
