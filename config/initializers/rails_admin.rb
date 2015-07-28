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

  place_fields = lambda { |thing|
    field :name
    field :description
    field :address
    field :photo
  }

  config.model 'Place' do
    edit(&place_fields)
  end

  ['Crossing', 'Hub'].each do |model|
    config.model model do
      edit(&place_fields)
    end
  end

  config.model 'Layer' do
    field :name
    field :color, :enum do
      enum_method do
        :colors
      end
    end
  end
end
