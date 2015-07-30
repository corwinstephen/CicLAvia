RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model 'SuperEvent' do
    label "Ciclavia" 
    label_plural "Ciclavias"

    field :name
    field :date
    field :default
    field :description
    field :routes
    field :layers
  end

  place_fields = lambda { |thing|
    field :name
    field :description
    field :address
    field :photo
  }

  config.model 'Place' do
    edit(&place_fields)
  end

  ['Crossing'].each do |model|
    config.model model do
      edit(&place_fields)
    end
  end

  config.model 'Hub' do
    field :name
    field :description
    field :address
    field :photo
    field :events
  end

  config.model 'Layer' do
    field :name
    field :color, :enum do
      enum_method do
        :colors
      end
    end
  end

  config.model 'Route' do
    field :name
    field :geojson
  end

  [SubEvent, Place, Crossing, RouteSegment, User].each do |model|
    config.excluded_models << model
  end

  config.navigation_static_links = {
    'Go to map' => '/'
  }
end
