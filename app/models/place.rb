class Place < ActiveRecord::Base
  belongs_to :user
  belongs_to :route
  belongs_to :layer

  has_many :events,
            -> { where.not(type: 'SuperEvent') },
            foreign_key: 'place_id'

  geocoded_by :address, :latitude  => :lat, :longitude => :lng
  before_validation :geocode

  has_attached_file :photo,
                    :styles => { :large => '500x300#', :medium => '250x150#', :thumb => '50x50#' },
                    :storage => :s3,
                    :s3_credentials => "#{Rails.root}/config/s3.yml",
                    :path => '/places/:id/:style/:filename',
                    :default_url => '',
                    :url => ':s3_domain_url'

  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/                    
  
  validates_presence_of :name,
                        :lat,
                        :lng

  def as_json(opts = {})
    super(opts).merge({
      type: type,
      photo_url: {
        large: photo.url(:large)
      },
      events: events.order('created_at ASC').as_json
    })
  end

end