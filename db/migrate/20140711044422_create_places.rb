class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name, null: false
      t.text :description
      t.string :address
      t.float :lat, null: false
      t.float :lng, null: false
      t.references :user

      t.timestamps
    end
  end
end
