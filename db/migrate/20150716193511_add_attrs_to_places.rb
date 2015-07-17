class AddAttrsToPlaces < ActiveRecord::Migration
  def up
    enable_extension "hstore"
    add_column :places, :type, :string, null: false, default: 'place'
    add_column :places, :data, :hstore
    change_column :places, :type, :string, null: true, default: nil
  end

  def down
    disable_extension "hstore"
    remove_column :places, :type
    remove_column :places, :data
  end
end
