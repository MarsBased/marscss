require 'middleman-webpacker/manifest'

module Helpers

  def active(name, class_name = 'is-active')
    names = Array(name)
    if (class_active = current_page.metadata[:page][:active].to_s.downcase)
      if names.any? { |n| class_active.split(',').map(&:lstrip).include?(n.downcase) }
        class_name
      end
    end
  end

  def version(name, return_value = true, else_value = false)
    names = Array(name)
    @c = current_page
    @versions = "#{@c.data.version} #{@c.metadata[:locals][:versions]}"
    if names.any? { |n| @versions.split(/[\s,']/).include?(n) }
      return_value
    else
      else_value if else_value
    end
  end

  def full_url(path)
    "#{config[:host]}#{path}"
  end

  def svg(name)
    content_tag(:svg, class: "shape #{name}") do
      content_tag(:use, nil, :'xlink:href' => "#shape-#{name}")
    end
  end

  def example_html(cssClass = '', &block)
    concat_content(
      content_tag(:div, class: "documentation-example #{cssClass}",
       data: { "code-lang" => 'Example' } ) do
        capture_html(&block)
      end
    )
    code('html', {}, &block)
  end

  def example_tabs(&block)
    concat_content(
      content_tag(:div, class: 'example-tabs') do
        content_tag(:div, class: 'example-tabs__container') do
          Tilt['markdown'].new { capture_html(&block) }.render
        end
      end
    )
  end

  def markdown(&block)
    content = capture_html(&block)
    indent = content.scan(/^[ \t]*(?=\S)/).min.try(:size) || 0

    concat_content(
      Tilt['markdown'].new { content.gsub(/^[ \t]{#{indent}}/, '') }.render
    )
  end

  def add_layout_data(key, value)
    if current_page.metadata[:page][key]
      unless current_page.metadata[:page][key].include?(value)
        current_page.metadata[:page][key] += ", #{value}"
      end
    else
      current_page.metadata[:page][key] = value
    end
  end

  def file_marscss (
    file_name = current_page.data.example.gsub(/(.*\/)(.+)/, '\1_\2'),
    file_path = config.marscss_path
  )

    code('scss') do
      File
      .open("#{file_path}/#{file_name}.scss",'rb')
      .read.force_encoding("UTF-8")
    end
  end

  def code_snippet(snippet, file, lenguage = File.extname(file).delete('.'))
    code(lenguage) do
      File.open(file,'rb').read.match(%r{//--- #{snippet}\n(.*?)//---}m)[1]
    end
  end

  def file_example_scss (
    file_name = current_page.data.example,
    file_path = config.examples_path
  )
    code('scss') do
      File
      .open("#{file_path}/#{file_name}.scss",'rb')
      .read.gsub('../../../../marscss/marscss', '@marsbased/marscss/marscss')
      .force_encoding("UTF-8")
    end
  end

  def file_example_dist (
    file_name = current_page.data.example.tr('/-', '_').camelize(:lower),
    file_path = extension_options.dist_path+extension_options.stylesheets_base_path
  )

    code('css') do
      File
        .open("#{file_path}#{manifest_resource_path("#{file_name}.css")}",'rb')
        .read.force_encoding("UTF-8")
    end
  end

  def file_dist_size (
    file_name = current_page.data.example.tr('/-', '_').camelize(:lower),
    file_path = extension_options.dist_path+extension_options.stylesheets_base_path
  )

    file_size = File
      .open("#{file_path}#{manifest_resource_path("#{file_name}.css")}",'rb')
      .size;

    Filesize.from("#{file_size} b").to_s('Kb')
  end

  def source_link (
    text = 'on GitHub',
    file_name = current_page.data.example.gsub(/(.*\/)(.+)/, '\1_\2'),
    url = 'https://github.com/MarsBased/marscss/tree/master/marscss/scss'
  )

    content_tag(:a, href:"#{url}/#{file_name}.scss", target:'_blank', class: 'source-link') do
      text
    end
  end

  def source
    partial 'partials/documentation-source'
  end
end
