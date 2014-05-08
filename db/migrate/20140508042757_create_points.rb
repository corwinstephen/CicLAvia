class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.float :latitude
      t.float :longitude
      t.string :name
      t.text :description
      t.references :map, index: true

      t.timestamps
    end
  end
end
