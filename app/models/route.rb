class Route < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  validates_presence_of :name, :event

  def coordinates
    route_segments.map do |segment|
      segment.coordinate_array
    end
  end

  def midpoint
    first_coord = route_segments.first.coordinate_array.first
    last_coord = route_segments.first.coordinate_array.last

    diff = [(first_coord[0] - last_coord[0]) / 2, (first_coord[1] - last_coord[1]) / 2]
    return [first_coord[0] - diff[0], first_coord[1] - diff[1]]
  end

  def as_json(opts = {})
    {
      id: id,
      name: name,
      description: description,
      meetingPoint: meeting_point,
      departsAt: departs_at
    }
  end
end
