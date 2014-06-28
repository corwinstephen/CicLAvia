class RouteSegment < ActiveRecord::Base
  belongs_to :route

  def coordinate_array
    read_attribute(:coordinate_array).map do |latlng|
      latlng.map { |coord_as_string| coord_as_string.to_f }
    end
  end

  def as_json
    {
      name: name,
      coordinates: coordinate_array
    }
  end
end