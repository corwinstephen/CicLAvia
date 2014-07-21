class RouteImporter
  def self.import_from_kml(kml)
    self.new.import_from_kml(kml)
  end

  def import_from_kml(kml)
    @parser = KMLParser.new(kml)

    ActiveRecord::Base.transaction do
      route = Route.new
      route.name = @parser.document_name

      @parser.each_placemark do |placemark|
        if placemark.type == :LineString
          route.route_segments.build({
            name: placemark.name,
            coordinate_array: placemark.coordinates
          })
        elsif placemark.type == :Point
          route.places.build({
            name: placemark.name,
            lat: placemark.coordinates.first[0],
            lng: placemark.coordinates.first[1]
          })
        else
          raise "Don't know how to import placemark type #{placemark.type}"
        end
      end

      return route.save
    end

  end

end