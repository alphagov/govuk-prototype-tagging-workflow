require 'nokogiri'
require 'open-uri'

class PreviewController < ApplicationController
  def show
    topic_title = params[:title]

    page = Nokogiri::HTML(open(params[:url]))
    puts page.class   # => Nokogiri::HTML::Document

    style = '<style>.preview-topic { background-color: #fff2d3;}</style>'
    page.at_css("body").add_next_sibling(style);

    list_node = '<li class="preview-topic"><a href="#">'+topic_title+'</a></li>'

    ul = page.at_css("#content > div.browse-container.full-width > nav > ul")
    position = ul.css("li").map(&:content).map(&:strip).push(topic_title).sort.index(topic_title)
    ul.css("li")[position-1].add_next_sibling(list_node)

    render text: page.to_html
  end
end
