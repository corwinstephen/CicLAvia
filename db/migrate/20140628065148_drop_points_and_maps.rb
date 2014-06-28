class DropPointsAndMaps < ActiveRecord::Migration
  def up
    drop_table :points
    drop_table :maps
  end

  def down
    create_table "maps" do |t|
      t.string   "name"
      t.text     "description"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    create_table "points" do |t|
      t.float    "latitude"
      t.float    "longitude"
      t.string   "name"
      t.text     "description"
      t.integer  "map_id"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end
