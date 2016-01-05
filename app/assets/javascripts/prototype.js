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
    var $selected = $('#'+val+'_selected-item');
    var val = $this.val();

    var pos = val.lastIndexOf('_');
    var $topic = $('#'+val.substring(0, pos)+'_parent');

    if ($this.is(':checked') && $selected.length == 0) {
      $selected = $div.clone();

      $selected.attr('id', val+'_selected-item');
      $selected.appendTo($target);
      $topic.addClass('list-group-item-info');

      // Curated topic warning
      if (Math.random() <= (1/2)) {
        var $topicCuratedWarning = $('#topic-curated-warning');

        if ($topicCuratedWarning.length == 0) {
          var $warningTarget = $('#tag-explorer').parents('.row').first();

          $('<div class="notice bg-info"><p id="topic-curated-warning">Read the guidance on how to <a href="#">get content added to curated topics</a>.</p></div>')
            .insertAfter($warningTarget);
          $topicCuratedWarning = $('#topic-curated-warning');
        }

        var topicName = $.trim($div.text());
        $topicCuratedWarning.before('<p id="topic-curated-warning-'+val+'">'+topicName+' is a curated topic.</p>');
      }

      // email subscribers warning
      if (Math.random() <= (1/5)) {
        var numSubs = Math.floor(Math.random() * (200 - 1000) + 1000);

        var $topicSubscribers = $('#topic-area-subscribers');

        if ($topicSubscribers.length == 0) {
          var $warningTarget = $('#tag-explorer').parents('.row').first();

          $('<div class="notice bg-danger"><span id="topic-area-subscribers">0</span> users will be emailed about this document.</div>')
            .insertAfter($warningTarget);
          $topicSubscribers = $('#topic-area-subscribers');
        }

        $topicSubscribers.text(numSubs + Number($topicSubscribers.text()));
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