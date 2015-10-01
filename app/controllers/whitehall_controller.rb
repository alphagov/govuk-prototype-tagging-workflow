class WhitehallController < ApplicationController
  def index

  end

  def tagging
    @topics = JSON.parse(File.open('app/data/topics.json').read)['links']['children']
  end
end

