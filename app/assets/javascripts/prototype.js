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

    var $this = $(this);
    var $chosen = $('#chosen-subtopics');
    var val = $this.attr('href');
    var $opt = $chosen.find('option[value='+val+']');

    if ($opt.attr('selected') == 'selected') {
      $opt.attr('selected', false).trigger('chosen:updated');

      var topicSlug = $this.attr('id');
      $('#topic-curated-warning-'+topicSlug).remove();

      var $topicCuratedWarning = $('#topic-curated-warning');
      if ($topicCuratedWarning.siblings().length == 0) {
        $topicCuratedWarning.parent().remove();
      }
    } else {
      $opt.attr('selected', true).trigger('chosen:updated');;

      // random 1 in 5
      if (Math.random() <= 0.2) {
        var $topicCuratedWarning = $('#topic-curated-warning');

        if ($topicCuratedWarning.length == 0) {
          $('<div class="notice bg-info"><p id="topic-curated-warning">Read the guidance on how to <a href="#">get content added to curated topics</a>.</p></div>')
            .insertBefore('#tag-explorer');
          $topicCuratedWarning = $('#topic-curated-warning');
        }

        var topicName = $this.text();
        var topicSlug = $this.attr('id');

        $topicCuratedWarning.before('<p id="topic-curated-warning-'+topicSlug+'">'+topicName+' is a curated topic.</p>');
      }
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


  $('#policy-area-ids').chosen().change(function(e, p) {
    if (p.selected != null) {
      var numSubs = Math.floor(Math.random() * (200 - 1000) + 1000);

      var $policySubscribers = $('#policy-area-subscribers');

      if ($policySubscribers.length == 0) {
        $('<div class="notice bg-danger"><span id="policy-area-subscribers">0</span> users will be emailed about this document.</div>')
          .insertAfter('#policy_area_ids_chosen');
        $policySubscribers = $('#policy-area-subscribers');
      }

      $policySubscribers.text(numSubs + Number($policySubscribers.text()));
    }
  });
});