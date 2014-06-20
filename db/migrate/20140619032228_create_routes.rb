class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.references :user
      t.string :coordinate_array, array: true, default: '{}', null: false
      t.string :name, null: false

      t.timestamps
    end

    add_index :routes, :user_id
  end
end
