class AddOfficialRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :official, :boolean, null: false, default: false
  end
end
