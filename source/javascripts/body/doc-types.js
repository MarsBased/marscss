import 'slick-carousel';

(function() {
  'use strict';

  $(document).ready(function() {
    $('.doc-type__slides').slick({
      rows: 0,
      arrows: true,
      dots: true,
      infinite: false,
      cssEase: 'linear',
      customPaging: function(slider, i) {
        return $('.doc-type__dot')
          .eq(i)
          .clone();
      }
    });
  });
})();
