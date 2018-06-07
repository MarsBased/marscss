(function() {
  'use strict';

  var $data = $('*[data-anchors-menu]');

  if ($data.length) {
    $data.each(function() {
      var targetMenu = $data.data('target') || 'body',
        classMenu = $data.data('class-menu') || 'anchors-menu',
        anchors = $data.data('anchors-menu') || '> :header :not(h1)',
        $elements = $data.find(anchors);

      $(targetMenu).append('<ul class="' + classMenu + '"></ul>');

      $elements.each(function() {
        var link = '#' + $(this).attr('id'),
          title = $(this).html(),
          cssClass = 'anchor-' + this.tagName.toLowerCase();

        $('.' + classMenu).append(
          '<li><a class="' + cssClass + '" href="' + link + '">' + title + '</a></li>'
        );
      });
    });
  }
})();
