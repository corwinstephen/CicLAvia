class SubEvent < Event
  belongs_to  :parent_event,
              :class_name => "SuperEvent"
end