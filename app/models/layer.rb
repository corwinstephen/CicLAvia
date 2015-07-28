class Layer < ActiveRecord::Base
  COLORS = ['blue', 'yellow', 'red', 'green']

  validates_presence_of :name
  validates :color, inclusion: { in: COLORS }

  has_many :places

  public

  def colors
    COLORS
  end

  def as_json(opts = {})
    super(opts).merge({
      places: places.as_json
    })
  end
end