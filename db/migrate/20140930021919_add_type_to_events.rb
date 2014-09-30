class AddTypeToEvents < ActiveRecord::Migration
  def change
    add_column :events, :type, :string, default: "SubEvent"
    add_column :events, :parent_event_id, :integer
    add_index  :events, :parent_event_id
  end
end
