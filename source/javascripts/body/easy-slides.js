(function() {
  'use strict';

  function rand(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function moveSlide($slide, options) {
    setTimeout(() => {
      const $this = $slide.find(`.${options.className}`);
      if ($this.is(':last-child')) {
        $slide
          .children()
          .first()
          .addClass(options.className)
          .siblings()
          .removeClass(options.className);
      } else {
        $this
          .next()
          .addClass(options.className)
          .siblings()
          .removeClass(options.className);
      }
      moveSlide($slide, options);
    }, rand(options.min, options.max));
  }

  $('easy-slides').each(function() {
    let $this = $(this);
    const options = {
      min: $this.attr('min') || 4000,
      max: $this.attr('max') || 8000,
      className: $this.attr('class-name') || 'is-active'
    };

    $this
      .children()
      .removeClass(options.className)
      .first()
      .addClass(options.className);

    moveSlide($this, options);
  });
})();
