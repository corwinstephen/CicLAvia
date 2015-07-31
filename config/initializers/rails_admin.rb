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
    label "CicLAvia" 
    label_plural "CicLAvias"

    field :name
    field :date
    field :default
    field :description
    field :routes
    field :layers
  end

  config.model 'Event' do
    field :name
    field :date
    field :description
  end

  config.model 'Place' do
    field :name
    field :description
    field :address
    field :photo
    field :layer
  end

  config.model 'Crossing' do
    field :name
    field :description
    field :address
    field :photo
    field :layer
  end

  config.model 'Hub' do
    field :name
    field :description
    field :address
    field :photo
    field :events do
      associated_collection_cache_all false
      associated_collection_scope do
        Proc.new { |scope|
          # scoping all Players currently, let's limit them to the team's league
          # Be sure to limit if there are a lot of Players and order them by position
          scope = scope
        }
      end
    end
    field :layer
  end

  config.model 'Layer' do
    field :name
    field :color, :enum do
      enum_method do
        :colors
      end
    end
    field :places
  end

  config.model 'Route' do
    field :name
    field :geojson
  end


  [SubEvent, RouteSegment, User].each do |model|
    config.excluded_models << model
  end

  config.navigation_static_links = {
    'Go to map' => '/'
  }
end
