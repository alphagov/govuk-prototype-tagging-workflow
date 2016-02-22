$(document).ready(function() {
  $('.tag-explorer-topics-level-1 a').on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var $subtopic = $($this.attr('href'));

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $this.siblings('.list-group-item').show();

      $subtopic.hide();
      $('.js-topic-filter').trigger('keyup');
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
    var val = $this.val();
    var $selected = $('#'+val+'_selected-item');
    var $suggested = $('#'+val+'-suggested');
    var topicName = $div.text().trim();

    var pos = val.lastIndexOf('_');
    var $topic = $('#'+val.substring(0, pos)+'_parent');
    var curated = $div.data('curated');

    if ($this.is(':checked') && $selected.length == 0) {
      $selected = $div.clone();

      $selected.attr('id', val+'_selected-item');
      $selected.appendTo($target);
      $selected.removeClass('no-search-match matched-search');
      $topic.addClass('list-group-item-info');

      // Curated topic warning
      if (curated) {
        var $curatedTopics = $('.curated-topics');
        if ($curatedTopics.is(':hidden')) {
          $curatedTopics.show();
        }

        $('.curated-topics-list').append('<li id="topic-curated-warning-'+val+'">'+topicName+'</li>');
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

      // Preview topic
      if (!curated) {
        var $previewTopics = $('.preview-topics');
        if ($previewTopics.is(':hidden')) {
          $previewTopics.show();
        }

        var documentTitle = "School capital funding allocations: 2015 to 2018";
        var previewURL = '/preview?url=https://www.gov.uk'+val.replace(/_/g, "/")+'&title='+documentTitle;
        var previewLink = '<li id="preview-topics-'+val+'"><a href="'+previewURL+'" rel="external" target="_blank">'+topicName+'</a></li>';

        $('.preview-topics-list').append($(previewLink));
      }

    } else if (!$this.is(':checked')) {
      $('#'+val+'_selected-item').remove();

      if ($div.siblings().find('input:checked').length == 0) {
        $topic.removeClass('list-group-item-info');
      }

      $('#topic-curated-warning-'+val).remove();

      var $topicCuratedWarning = $('#topic-curated-warning');
      if ($topicCuratedWarning.siblings().length == 0) {
        $topicCuratedWarning.parent().remove();
      }
    }

    $suggested.prop('checked', $this.prop('checked'));
  });

  $('#selected-topics').on('change', 'input', function(e) {
    var $this = $(this);
    var $div = $this.parents('.list-group-item');
    var $master = $('#'+$this.val()+'-item');
    var $suggested = $('#'+$this.val()+'-suggested');

    if ($this.is(':checked') == false) {
      $div.remove();
      $master.find('input').click();
    }

    $suggested.prop('checked', $this.prop('checked'));
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

  $('.suggested-topics-list').on('change', 'input', function(e) {
    var $this = $(this);
    var id = $this.val();

    $(id).find('input').prop('checked', $this.prop('checked')).trigger('change');
  });

  $('#suggested-topics-select').on('click', function(e) {
    e.preventDefault();

    $('.suggested-topics-list').find('input').prop('checked', true).trigger('change');
  });

  $('.preview-topics').hide() // hide preview box on load
  $('.curated-topics').hide() // hide curated topics box on load

  $('.nav-tabs').on('click', 'a', function(e) {
    unloadWarning = true;
  });

  $(window).on('beforeunload', function(e) {
    if (unloadWarning) {
      unloadWarning = false;
      return "You have unsaved changes that will be lost if you leave this page."
    }
  });
});
