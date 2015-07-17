class Event < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :date

  has_many :routes

  def as_json(opts = {})
    super(opts).merge({
      routes: routes.as_json
    })
  end
end