(function() {
  'use strict';

  function scroll(hash) {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top
      },
      600,
      function() {
        window.location.hash = hash;
      }
    );
  }
  $(document).ready(function() {
    if (window.location.hash) {
      scroll(window.location.hash);
    }

    $('a').on('click', function(event) {
      if (this.hash !== '') {
        event.preventDefault();
        var hash = this.hash;
        scroll(hash);
      }
    });
  });
})();
