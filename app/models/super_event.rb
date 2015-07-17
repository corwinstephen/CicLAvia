class SuperEvent < Event
  has_many  :sub_events,
            :foreign_key => "parent_event_id"

  has_many :layers,
           :foreign_key => "event_id",
           dependent: :destroy

  def as_json(opts = {})
    super.merge({
      layers: layers.as_json  
    })
  end
end