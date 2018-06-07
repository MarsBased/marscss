(function() {
  'use strict';

  var table = '.table-collapse',
    collapseBtn = '.table-collapse__btn',
    collapseItem = '.table-collapse__item',
    resize = '.table-collapse__resize';

  $(collapseBtn).on('click', function() {
    $(collapseBtn)
      .not(this)
      .removeClass('is-active')
      .next(collapseItem)
      .removeClass('is-active')
      .find(resize)
      .slideUp();

    $(this)
      .toggleClass('is-active')
      .next(collapseItem)
      .toggleClass('is-active')
      .find(resize)
      .slideToggle();
  });

  $(table + ' .cell-actions a').on('click', function(e) {
    e.stopPropagation();
  });
})();
