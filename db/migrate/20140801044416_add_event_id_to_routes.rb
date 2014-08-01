class AddEventIdToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :event_id, :integer, null: false
    add_index :routes, :event_id
  end
end
