class Place < ActiveRecord::Base
  belongs_to :user
  belongs_to :route
  belongs_to :layer

  geocoded_by :address, :latitude  => :lat, :longitude => :lng
  before_validation :geocode

  has_attached_file :photo,
                    :styles => { :large => '500x300#', :medium => '250x150#', :thumb => '50x50#' },
                    :storage => :s3,
                    :s3_credentials => "#{Rails.root}/config/s3.yml",
                    :path => '/plces/:id/:style/:filename',
                    :default_url => '/images/defaults/noavatar.svg',
                    :url => ':s3_domain_url'

  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/                    
  
  validates_presence_of :name,
                        :lat,
                        :lng

  def as_json(opts = {})
    super(opts).merge({
      photo_url: {
        large: photo.url(:large)
      }  
    })
  end

end