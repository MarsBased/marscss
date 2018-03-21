(function () {
  'use strict';

  $('.source-code').hide();

  $('.source-button').on('click', function(e){
    e.preventDefault();

    let new_text = $(this).attr('data-toggle-text');
    let old_text = $(this).attr('data-toggle-text', $(this).html());

    $(this).html(new_text);

    $('.source-code').slideToggle();
  });

})();
