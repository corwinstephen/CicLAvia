class AddLayerIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :layer_id, :integer
    add_index :places, :layer_id
  end
end
