class RouteImporter
  def self.import_route_from_kml(kml)
    route = KMLParser.new(kml)

    placemark_data = route.placemarks.map do |placemark|
      {
        name: placemark.name,
        coordinates: placemark.coordinates
      }
    end

    route_data = {
      name: route.document_name,
      segments: placemark_data
    }

  end
end