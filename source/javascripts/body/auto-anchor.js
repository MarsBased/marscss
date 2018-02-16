(function() {
  'use strict';

  function scroll(hash) {
    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top
      },
      0,
      function() {
        window.location.hash = hash;
      }
    );
  }
  $(document).ready(function() {
    scroll(window.location.hash);

    console.log(window.location.hash);
    $('a').on('click', function(event) {
      if (this.hash !== '') {
        event.preventDefault();
        var hash = this.hash;
        scroll(hash)
      }
    });
  });
})();
