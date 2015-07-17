class CreateLayers < ActiveRecord::Migration
  def change
    create_table :layers do |t|
      t.string :name, null: false
      t.integer :event_id
    end
  end
end
