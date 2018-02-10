(function() {
  'use strict';

  var $headings = $('*[data-headings-add-anchor] :header');

  console.log("funciono");
  $headings.each(function() {
    var link = '#' + $(this).attr('id');
    $(this).wrapInner("<a href='" + link + "'></a>");
  });
})();
