class AddColorToLayers < ActiveRecord::Migration
  def change
    add_column :layers, :color, :string
  end
end
