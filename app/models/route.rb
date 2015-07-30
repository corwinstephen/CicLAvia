class Route < ActiveRecord::Base
  belongs_to :user
  belongs_to :event

  validates_presence_of :name, :geojson

  def coordinates
    route_segments.map do |segment|
      segment.coordinate_array
    end
  end

  def as_json(opts = {})
    super(opts)
  end
end
