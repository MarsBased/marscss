(function() {
  'use strict';

  const input = '.api-search input',
    table = '.api-content table',
    tableItem = '.api-content .table-collapse__btn',
    filterButtons = '.api-buttons button',
    checkboxColumns = '.api-content th .checkbox input';

  $(input).on('keyup', searchTable);
  $(checkboxColumns).on('change', setPlaceholder);
  $(filterButtons).on('click', function() {
    filterTable(this);
  });

  function setPlaceholder() {
    let searchText = '';

    $(checkboxColumns).each(function() {
      if ($(this).is(':checked')) {
        const placeholder = $(this).data('placeholder');

        searchText +=
          searchText === '' ? `search by ${placeholder}` : ` or ${placeholder}`;
      }
    });

    $(input)
      .prop('disabled', searchText === '')
      .attr('placeholder', searchText);

    searchTable();
  }

  function searchTable() {
    $(tableItem).each(function() {
      const filter = $(input).val();
      const $this = $(this);
      const $elements = $(this).add($(this).next());

      let string = '';

      $(checkboxColumns).each(function() {
        if ($(this).is(':checked')) {
          string += $this.find($(this).data('target')).text();
        }
      });

      $elements.toggle(string.indexOf(filter) > -1);
    });
  }

  function filterTable(button) {
    let $filterElements = $();
    let itemsLength = $(button)
      .parent()
      .children().length;
    let activeLength = $(button)
      .parent()
      .find('.is-active').length;

    // disable other buttons if all are is-active
    if (itemsLength === activeLength) {
      $(button)
        .siblings()
        .removeClass('is-active');
    } else if (activeLength === 1 && $(button).hasClass('is-active')) {
      $(button)
        .siblings()
        .addClass('is-active');
    } else {
      $(button).toggleClass('is-active');
    }

    $(filterButtons).each(function() {
      if (!$(this).hasClass('is-active'))
        $filterElements = $filterElements.add(
          $(`${table} tr.is-${$(this).data('target')}`)
        );
    });

    $(`${table} tr`).removeClass('display-none');

    $filterElements.addClass('display-none');

    searchTable();
  }
})();
