(function() {
  'use strict';

  $('[data-open-menu]').on('click', function() {
    $(this)
      .find('.icon-hamburger')
      .toggleClass('is-active');
    $('body').toggleClass('is-menu-open');
  });
})();
