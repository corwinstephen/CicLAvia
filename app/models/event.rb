class Event < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :date
  default_scope order('date ASC')

  has_many :routes

  def as_json(opts = {})
    super(opts).merge({
      routes: routes.as_json,
      time: date.strftime('%l%P')
    })
  end

end