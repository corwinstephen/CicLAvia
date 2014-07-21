# Import default routes
file_root = Rails.root.join("db", "kml", "routes")
Dir.foreach(file_root) do |kml_file|
  next if kml_file == '.' or kml_file == '..'
  kml = File.open([file_root,kml_file].join("/")).read  
  RouteImporter.import_from_kml(kml)
end