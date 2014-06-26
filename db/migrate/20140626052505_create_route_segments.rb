class CreateRouteSegments < ActiveRecord::Migration
  def change
    create_table :route_segments do |t|
      t.references :route, null: false
      t.string :name
      t.string :coordinate_array, array: true, default: '{}', null: false
    end

    add_index :route_segments, :route_id
  end
end
