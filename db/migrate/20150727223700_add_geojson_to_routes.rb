class AddGeojsonToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :geojson, :json, null: false
  end
end
