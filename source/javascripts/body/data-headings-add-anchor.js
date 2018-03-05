(function() {
  'use strict';

  var $headings = $('*[data-headings-add-anchor] >  :header').not('h4, h5, h6');

  $headings.each(function() {
    var link = '#' + $(this).attr('id');

    $(this)
      .wrapInner('<div class="data-anchor-js"></div>')
      .find('.data-anchor-js')
        .append('<a href="' + link + '">#</a>');
  });
})();
