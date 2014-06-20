class Route < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :name,
                        :coordinate_array

  def coordinates_as_json
    coordinate_array.map do |latlng|
      latlng.map { |coord_as_string| coord_as_string.to_f }
    end
  end
end
