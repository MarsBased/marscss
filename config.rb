require "lib/helpers"
helpers Helpers

set :markdown, :fenced_code_blocks => true
set :relative_links, true

activate :pry
activate :directory_indexes
activate :syntax
activate :webpack,
 development_webpack_cmd: './node_modules/webpack/bin/webpack.js --mode development ' \
      '--watch --config config/webpack/development.js',
 production_webpack_cmd: 'NODE_ENV=production ./node_modules/webpack/bin/webpack.js ' \
      '--bail --config config/webpack/production.js'


set :examples_path, File.dirname(__FILE__)+'/source/stylesheets/examples'
set :marscss_path, File.dirname(__FILE__)+'/marscss/scss'
set :root_path, File.dirname(__FILE__)

# configure :development do
#   activate :livereload, no_swf: true, ignore: [/images.bundle.js/]
# end

ready do
  @pages = sitemap.resources.find_all{|p| p.source_file.match(/\.html/) }
  @pages.each do |r|
    @versions = []
    if @data = r.data['versions']
      @data.split(/[\s,']/).reject(&:empty?).each do |d|
        @versions.push(d)
      end
    end
    @versions.each do |version|
      @path = r.destination_path.gsub 'index.html', "_#{version}.html"
      proxy @path, r.path, :locals => { :versions => version }
    end
  end
end

configure :build do
  ignore 'shapes/*'
  activate :asset_hash, ignore: /assets/
  set :environment, 'production'
  #set :http_prefix, '/marsman'
end
