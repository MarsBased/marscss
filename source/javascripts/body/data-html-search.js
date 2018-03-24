(function () {
  'use strict';

  function search(element) {
    var $element = $($(element).data('search-html'));
    var search = $(element).val();

    $element.each(function() {
      if ($(this).html().includes(search)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  //input element
  $('[data-search-html]').each(function(){
    $(this).on('keyup', function(){ search(this) });
    $(this).on('change', function() { search(this) });
  });

})();