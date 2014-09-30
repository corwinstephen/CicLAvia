class AddDefaultToEvents < ActiveRecord::Migration
  def change
    add_column :events, :default, :boolean, :default => false
  end
end
