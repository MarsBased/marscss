(function() {
  'use strict';

  var $headings = $('*[data-headings-add-anchor] >  :header').not('h4, h5, h6');

  $headings.each(function() {
    var link = '#' + $(this).attr('id');
    $(this).wrapInner("<a href='" + link + "'></a>");
  });
})();
