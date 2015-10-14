$(document).ready(function() {
  $('.tag-explorer-topics-level-1 a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var $subtopic = $($this.attr('href'));

    // hide other subtopics
    $this.parents('.panel').find('.tag-explorer-topics-level-2').hide();

    // show selected subtopic
    $subtopic.show();
    $this.addClass('active').siblings().removeClass('active');
  });

  $('.tag-explorer-topics-level-2 a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this), $chosen = $('#chosen-subtopics');
    var val = $this.attr('href');

    var $opt = $chosen.find('option[value='+val+']');

    if ($opt.attr('selected') == 'selected') {
      $opt.attr('selected', false).trigger('chosen:updated');
    } else {
      $opt.attr('selected', true).trigger('chosen:updated');;
    }

    $this.toggleClass('active');
  });

  $('#chosen-subtopics').chosen().change(function(e, p) {
    if (p.deselected != null) {
      $('#'+p.deselected+'-item').toggleClass('active');
    } else if (p.selected != null) {
      $('#'+p.selected+'-item').toggleClass('active');
    }
  });
});