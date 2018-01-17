(function () {
  'use strict';

  var $tabs = $('.example-tabs__container');

  $tabs.each(function(){
    var names = [],
        $items = $(this).children(),
        htmlButtons;

    //add to names child items
    $items.each(function(){
      if($(this).hasClass('highlight')){
        var cssClass = $(this).children().attr('class').split(' ');
        names.push(cssClass.pop())
      } else  {
        names.push('html')
      }
    })

    $(this)
      .parent()
        .prepend('<div class="example-tabs__menu"></div>');

    $.each(names, function(){
      $('.example-tabs__menu')
        .append('<button class="example-tabs__btn">'+this+'</button>');
    });

    $('.example-tabs__btn')
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