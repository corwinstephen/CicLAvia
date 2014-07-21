class Place < ActiveRecord::Base
  belongs_to :user
  belongs_to :route
  
  validates_presence_of :name,
                        :lat,
                        :lng

end