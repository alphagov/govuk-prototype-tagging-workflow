(function() {
  "use strict";
  window.GOVUK = window.GOVUK || {};

  window.GOVUK.ieHandler = {
    init: function init() {
      if ( !window.ieVersion ) return;

      if( window.ieVersion && ieVersion === 8){
        $('textarea').each(function(i, el){
          $(el).css('width', $(el).width());
        });
      }
    }
  };
}());

