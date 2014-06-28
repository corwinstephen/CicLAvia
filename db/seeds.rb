# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Import default routes
file_root = Rails.root.join("db", "kml", "routes")
Dir.foreach(file_root) do |kml_file|
  next if kml_file == '.' or kml_file == '..'
  kml = File.open([file_root,kml_file].join("/")).read  
  RouteImporter.import_route_from_kml(kml)
end