class WhitehallController < ApplicationController
  def detailed_guide
  end

  def tagging
  end


  def organisations
    @organisations = JSON.parse(File.open('app/data/organisations.json').read)['results'].sort_by { |r| r['title'] }
  end
  helper_method :organisations

  def topics
    @topics = JSON.parse(File.open('app/data/topics.json').read)['links']['children']
  end
  helper_method :topics

  def policies
    @policies = JSON.parse(File.open('app/data/policies.json').read)['results'].sort_by! { |r| r['title'] }
  end
  helper_method :policies

  def policy_areas
    @policy_areas = JSON.parse(File.open('app/data/policy_areas.json').read)['results'].sort_by! { |r| r['title'] }
  end
  helper_method :policy_areas
end
