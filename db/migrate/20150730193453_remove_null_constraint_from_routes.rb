class RemoveNullConstraintFromRoutes < ActiveRecord::Migration
  def change
    change_column :routes, :event_id, :integer, null: true
    remove_column :routes, :official
    remove_column :routes, :meeting_point
    remove_column :routes, :description
    remove_column :routes, :user_id
  end
end
