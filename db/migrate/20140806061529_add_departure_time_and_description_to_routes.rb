class AddDepartureTimeAndDescriptionToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :departs_at, :timestamp
    add_column :routes, :meeting_point, :string
    add_column :routes, :description, :text
  end
end
