// external js: isotope.pkgd.js

$( document ).ready( function() {
  // init Isotope
  
  var qsRegex;
var buttonFilter;
// init Isotope
  var $container = $('.isotope').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text(); 
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    },
        filter: function() {
            var $this = $(this);
            var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
            var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
            return searchResult && buttonResult;
        },
        // sort top priority to lowest priority
        sortBy: ['resortType', 'country', 'state', 'city']
  });

// -------- Filter FUNCTION ----------//
$('#filters').on( 'click', 'button', function() {
    buttonFilter = $( this ).attr('data-filter');
    console.log("Filter button click", buttonFilter);
    $container.isotope();
});

// ----------- Search FUNCTION --------//
// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
    console.log("Search input",qsRegex);
    $container.isotope();
}) );

/*
// ------------- Sort FUNCTION -------------//
// bind sort button click
$('#sorts').on( 'click', 'button', function() {
    var sortValue = $(this).attr('data-sort-value');
    // make an array of values
    sortValue = sortValue.split(',');
    console.log("Sorting button click",sortValue);
    $container.isotope({ 
                sortBy: ['resortType', sortValue]
            });
});
*/
    // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
        console.log("Sort input",sortByValue);
    $container.isotope({ 
        sortBy: sortByValue }
        );
  });
 
// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
});




 

  
  
  
