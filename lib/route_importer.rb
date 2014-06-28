class RouteImporter
  def self.import_route_from_kml(kml)
    self.new.import_route_from_kml(kml)
  end

  def import_route_from_kml(kml)
    @parser = KMLParser.new(kml)

    ActiveRecord::Base.transaction do
      route = Route.new
      route.name = @parser.document_name

      @parser.each_placemark do |placemark|
        route.route_segments.build({
          name: placemark.name,
          coordinate_array: placemark.coordinates
          })
      end

      return route.save
    end

  end

end