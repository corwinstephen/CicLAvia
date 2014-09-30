class SuperEvent < Event
  has_many  :sub_events,
            :foreign_key => "parent_event_id"
end