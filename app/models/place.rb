class Place < ActiveRecord::Base
  belongs_to :user
  belongs_to :route
  belongs_to :layer

  geocoded_by :address, :latitude  => :lat, :longitude => :lng
  before_validation :geocode
  
  validates_presence_of :name,
                        :lat,
                        :lng

end