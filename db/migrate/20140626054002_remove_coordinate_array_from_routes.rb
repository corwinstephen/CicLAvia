class RemoveCoordinateArrayFromRoutes < ActiveRecord::Migration
  def change
    remove_column :routes, :coordinate_array
  end
end
