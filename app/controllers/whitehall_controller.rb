class WhitehallController < ApplicationController
  before_action :process_parameters, except: [:tagging]

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

  def ministers
    @ministers = JSON.parse(File.open('app/data/ministers.json').read)['results'].sort_by! { |r| r['title'] }
  end
  helper_method :ministers

  def locations
    @ministers = JSON.parse(File.open('app/data/world_locations.json').read)['results'].sort_by! { |r| r['title'] }
  end
  helper_method :locations

  private

  def process_parameters
    # playing with seeing different forms of tagging page
    @version = params['v']
    if @version
      session[:version] = @version
    else
      session[:version] = 'b'
    end
  end
end
