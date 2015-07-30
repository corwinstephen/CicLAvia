class Event < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :date

  has_many :routes

  before_save :check_for_default

  def as_json(opts = {})
    super(opts).merge({
      routes: routes.as_json
    })
  end

  private

  def check_for_default
    unless Event.find_where(default: true).present?
      self.default = true
    end
  end
end