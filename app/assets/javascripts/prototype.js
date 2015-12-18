$(document).ready(function() {
  $('.tag-explorer-topics-level-1 a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var $subtopic = $($this.attr('href'));

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $this.siblings('.list-group-item').show();

      $subtopic.hide();
    } else {
      // hide other subtopics
      $this.parents('.panel').find('.tag-explorer-topics-level-2').hide();

      // show selected subtopic & hide other topics
      $subtopic.show();
      $this.siblings('.list-group-item').removeClass('active').hide();
      $this.addClass('active');

      // scroll to top
      $this.parents('.tag-container').scrollTop(0);
    }
  });

  $('.tag-explorer-topics-level-2 input').on('change', function(e) {
    var $this = $(this);
    var $div = $this.parents('.list-group-item');
    var $target = $('#selected-topics').find('.tag-container');
    var $topic = $('.tag-explorer-topics-level-1 a:visible');
    var val = $this.val();

    if ($this.is(':checked') && $('#'+val+'-selected-item').length == 0) {
      var $selected = $div.clone();

      $selected.attr('id', val+'-selected-item');
      $selected.appendTo($target);
      $topic.addClass('list-group-item-info');

      // random 1 in 2
      if (Math.random() <= (1/2)) {
        var $topicCuratedWarning = $('#topic-curated-warning');

        if ($topicCuratedWarning.length == 0) {
          var $warningTarget = $('#tag-explorer').parents('.row').first();

          $('<div class="notice bg-info"><p id="topic-curated-warning">Read the guidance on how to <a href="#">get content added to curated topics</a>.</p></div>')
            .insertBefore($warningTarget);
          $topicCuratedWarning = $('#topic-curated-warning');
        }

        var topicName = $.trim($div.text());
        $topicCuratedWarning.before('<p id="topic-curated-warning-'+val+'">'+topicName+' is a curated topic.</p>');
      }
    } else {
      $('#'+val+'-selected-item').remove();

      if ($div.siblings().find('input:checked').length == 0) {
        $topic.removeClass('list-group-item-info');
      }

      $('#topic-curated-warning-'+val).remove();

      var $topicCuratedWarning = $('#topic-curated-warning');
      if ($topicCuratedWarning.siblings().length == 0) {
        $topicCuratedWarning.parent().remove();
      }
    }
  });

  $('#selected-topics').on('change', 'input', function(e) {
    var $this = $(this);
    var $div = $this.parents('.list-group-item');
    var $master = $('#'+$this.val()+'-item');

    if ($this.is(':checked') == false) {
      $div.remove();
      $master.find('input').click();
    }
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

  $('.suggested-topics-list').find('a').on('click', function(e) {
    e.preventDefault();

    var id = $(this).attr('href');
    $(id).click();
  });

  $('#suggested-topics-select').on('click', function(e) {
    e.preventDefault();

    $('.suggested-topics-list').find('a').click();
  });
});