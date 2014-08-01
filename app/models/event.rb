class Event < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :date

  has_many :routes
end