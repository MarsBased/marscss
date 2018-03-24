(function () {
  'use strict';

  var $tabs = $('.example-tabs');

  $tabs.each(function(){
    var names = [],
        name,
        $items = $(this).find('.example-tabs__container').children(),
        $this = $(this),
        htmlButtons;

    //add to names child items
    $items.each(function() {
      if ((name = $(this).data('code-lang'))) {
        names.push(name);
      } else if ($(this).hasClass('highlight')) {
        var cssClass = $(this)
          .children()
          .attr('class')
          .split(' ')
          .pop();
        var result = (cssClass == 'css') ? 'Compiled CSS' : cssClass;
        names.push(result);
      } else {
        names.push('html');
      }
    });

    $this
      .prepend('<div class="example-tabs__menu"></div>');

    $.each(names, function(){
      $this
        .find('.example-tabs__menu')
        .append('<button class="example-tabs__btn">' + this + '</button>');
    });

    $this.find('.example-tabs__btn')
      .on('click', function () {
        $(this)
          .addClass('is-active')
          .siblings()
            .removeClass('is-active')

        $items
          .eq($(this).index())
            .addClass('is-active')
            .siblings()
              .removeClass('is-active')
      })
      .first()
        .trigger('click');

  })

})();