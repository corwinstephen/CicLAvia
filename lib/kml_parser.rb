class KMLParser
  extend Enumerable

  def initialize(kml)
    @raw_kml = kml
    @parsed = Nokogiri::XML(kml)
  end

  def document_name
    @document_name ||= @parsed.at_css("name").content
  end

  def each
    @parsed.css("Placemark").each do |placemark|
      yield(Placemark.new(placemark))
    end
  end

  def placemarks
    @parsed.css("Placemark").map do |nokogiri_placemark|
      Placemark.new(nokogiri_placemark)
    end
  end

  class Placemark
    def initialize(nokogiri_placemark)
      @nokogiri_placemark = nokogiri_placemark
    end

    def name
      @nokogiri_placemark.at_css("name").try(:content)
    end

    def coordinates
      sloppy_coordinates = @nokogiri_placemark.at_css("coordinates").try(:content)
      return nil unless sloppy_coordinates

      coordinates = sloppy_coordinates.split(/\n\s+/).reject(&:blank?)
      coordinates = coordinates.map do |triplet|
        triplet.split(",").first(2).reverse.map do |item|
          item.to_f
        end
      end

      coordinates
    end
  end

end