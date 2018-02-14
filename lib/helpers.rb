module Helpers
  def active(name, class_name = 'is-active', reverse = false)
    if (class_active = current_page.data['active'])
      class_active.split(/[\s,']/)
      if reverse
        class_name unless class_active.include?(name)
      else
        class_name if class_active.include?(name)
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

  def example_html(&block)
    concat_content(
      content_tag(:div, class: 'documentation-example',
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
      current_page.metadata[:page][key] += " #{value}"
    else
      current_page.metadata[:page][key] = value
    end
  end
end
