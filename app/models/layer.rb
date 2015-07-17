class Layer < ActiveRecord::Base
  validates_presence_of :name

  has_many :places

  public

  def as_json(opts = {})
    super(opts).merge({
      places: places.as_json  
    })
  end
end