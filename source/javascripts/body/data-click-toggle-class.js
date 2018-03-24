(function () {
  'use strict';

  $('[data-click-toggle-class]').on('click', function(){
    $(this).toggleClass($(this).data('click-toggle-class'));
  });

})();
