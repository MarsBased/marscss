(function() {
  'use strict';

  var $headings = $('*[data-anchors-menu] > :header').not('h1');

  $headings.each(function() {
    let link = '#' + $(this).attr('id'),
      title = $(this).html(),
      cssClass = `anchor-${this.tagName.toLowerCase()}`;

    $('.documentation-anchors ul')
      .append(`<li><a class="${cssClass}" href="${link}">${title}</a></li>`);
  });
})();
