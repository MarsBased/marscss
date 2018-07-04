require 'yaml'

# build all documentation
apiData = []
apiData += YAML::load(File.open('data/api/api_elements.yml')).each {|e| e['file'] ||= '_elements.scss'}
apiData += YAML::load(File.open('data/api/api_forms.yml')).each {|e| e['file'] ||= '_forms.scss'}
apiData += YAML::load(File.open('data/api/api_helpers.yml')).each {|e| e['file'] ||= '_helpers.scss'}
apiData += YAML::load(File.open('data/api/api_icons.yml')).each {|e| e['file'] ||= '_icons.scss'}
apiData += YAML::load(File.open('data/api/api_reset.yml')).each {|e| e['file'] = '_reset.scss'}
apiData += YAML::load(File.open('data/api/api_utilities.yml')).each {|e| e['file'] = '_utilities.scss'}
apiData += YAML::load(File.open('data/api/api_values.yml')).each {|e| [e['file'] = '_values.scss', e['args'] ||= 0]}
apiData += YAML::load(File.open('data/api/api_properties.yml')).each {|e| [e['file'] = 'core/_properties.scss', e['args'] ||= 0]}

apiData.each {|e| e['type'] ||= 'block' }

fo = File.open('marscss/scss/tests/type-of.scss', 'w')

# main %emoji

fo.puts "
@function test-type-of() {
  @return (
"

apiData.each do | item |

puts item

fo.puts "    (
     'name': '#{item['name']}',
     'function': #{item['name']}(#{item['args'] || '' }),
     'type': '#{item['type']}',
     'args': '#{item['args'] || false}'),"
end

fo.puts "
  );
}
"

fo.close