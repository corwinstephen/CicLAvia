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
          build_route_segment_from_placemark(route, placemark)
        elsif placemark.type == :Point
          build_place_from_placemark(route, placemark)
        else
          raise "Don't know how to import placemark type #{placemark.type}"
        end
      end

      return route.save
    end
  end

  private

  def build_route_segment_from_placemark(route, placemark)
    return route.route_segments.build({
      name: placemark.name,
      coordinate_array: placemark.coordinates
    })
  end

  def build_place_from_placemark(route, placemark)
    return route.places.build({
      name: placemark.name,
      lat: placemark.coordinates.first[0],
      lng: placemark.coordinates.first[1]
    })
  end

end