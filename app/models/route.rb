class Route < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :name,
                        :coordinate_array

  def coordinate_array
    read_attribute(:coordinate_array).map do |latlng|
      latlng.map { |coord_as_string| coord_as_string.to_f }
    end
  end

  def midpoint
    first_coord = coordinate_array.first
    last_coord = coordinate_array.last

    diff = [(first_coord[0] - last_coord[0]) / 2, (first_coord[1] - last_coord[1]) / 2]
    return [first_coord[0] - diff[0], first_coord[1] - diff[1]]
  end
end
