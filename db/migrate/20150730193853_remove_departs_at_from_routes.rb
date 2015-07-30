class RemoveDepartsAtFromRoutes < ActiveRecord::Migration
  def change
    remove_column :routes, :departs_at
  end
end
