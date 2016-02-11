(function(Modules) {
  "use strict";
  Modules.TopicSearch = function() {
    var that = this;
    that.start = function(element) {

      var parents = element.find('.js-topic-parent'),
          children = element.find('.js-topic-child'),
          containers = element.find('.js-topic-parent-group'),
          tableInput = element.find('.js-topic-filter'),
          filterForm;

      element.on('keyup change', '.js-topic-filter', filterListBasedOnInput);

      function filterListBasedOnInput(event) {
        var searchString = $.trim(tableInput.val()),
            regExp = new RegExp(escapeStringForRegexp(searchString), 'i');

        // reset previous search matches
        parents.data('child-match-count', 0);
        children.data('matched', false);
        containers.data('count', 0);

        // search children, if match found, save count on group
        children.each(function() {
          var child = $(this),
              container = child.parent('.js-topic-parent-group'),
              count = container.data('count');

          if (child.text().search(regExp) > -1) {
            container.data('count', count + 1);
            child.data('matched', true);
          } else {
            child.data('matched', false);
          }
        });

        // search parents, hide or show based on match or children
        parents.each(function() {
          var parent = $(this),
              childrenId = parent.attr('id').replace(/_parent/, ''),
              $childrenContainer = $('#' + childrenId);

          // Parent matched
          if (parent.text().search(regExp) > -1) {
            parent.show();

          // Children matched
          } else if ($childrenContainer.data('count') > 0) {
            parent.show();

          // Nothing matched
          } else {
            parent.hide();
          }
        });
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
