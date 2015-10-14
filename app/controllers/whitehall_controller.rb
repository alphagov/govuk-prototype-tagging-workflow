class WhitehallController < ApplicationController
  def index
    @organisations = JSON.parse(File.open('app/data/organisations.json').read)['results'].sort_by { |r| r['title'] }
  end

  def tagging
    @topics = JSON.parse(File.open('app/data/topics.json').read)['links']['children']
  end
end

