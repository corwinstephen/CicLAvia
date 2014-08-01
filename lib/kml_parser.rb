class KMLParser

  def initialize(kml)
    @raw_kml = kml
    @parsed = Nokogiri::XML(kml)
  end

  def document_name
    @document_name ||= @parsed.at_css("name").content
  end

  def document_date
    # Incorrect, but documents currently don't have dates
    Time.now
  end

  def each_placemark
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

    def type
      return @type if @type.present?

      placemark_types = ["LineString", "Point"]

      placemark_types.each do |placemark_type|
        if @nokogiri_placemark.at_css(placemark_type).present?
          @type = placemark_type.to_sym
          return @type
        end
      end

      raise UnrecognizedPlacemarkTypeError, "The placemark being imported does not contain an element matching one of #{placemark_types}"
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

    class UnrecognizedPlacemarkTypeError < StandardError; end
  end

end