(function(Modules) {
  "use strict";
  Modules.TopicSearch = function() {
    var that = this;
    that.start = function(element) {

      var parents = element.find('.js-topic-parent'),
          children = element.find('.js-topic-child'),
          tableInput = element.find('.js-topic-filter'),
          filterForm;

      element.on('keyup change', '.js-topic-filter', filterListBasedOnInput);

      function filterListBasedOnInput(event) {
        var searchString = $.trim(tableInput.val()),
            regExp = new RegExp(escapeStringForRegexp(searchString), 'i');

        parents.each(function() {
          var parent = $(this);
          if (parent.text().search(regExp) > -1) {
            parent.show();
          } else {
            parent.hide();
          }
        });
        console.log(searchString);
      }

      // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
      // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
      // Escape ~!@#$%^&*(){}[]`/=?+\|-_;:'",<.>
      function escapeStringForRegexp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }
    }
  };

})(window.GOVUKAdmin.Modules);
