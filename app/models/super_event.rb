class SuperEvent < Event
  has_many  :sub_events,
            :foreign_key => "parent_event_id"

  has_many :layers,
           :foreign_key => "event_id",
           dependent: :destroy

  before_save :set_default_event

  def self.default
    find_by_default(true)
  end

  def as_json(opts = {})
    super.merge({
      layers: layers.as_json,
      routes: routes.as_json
    })
  end

  private

  def set_default_event
    if self.default? || SuperEvent.find_by_default(true).blank?
      SuperEvent.where.not(id: id).update_all(default: false)
    end
  end
end