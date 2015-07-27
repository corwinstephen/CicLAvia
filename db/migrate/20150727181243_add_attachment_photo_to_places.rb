class AddAttachmentPhotoToPlaces < ActiveRecord::Migration
  def self.up
    change_table :places do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :places, :photo
  end
end
