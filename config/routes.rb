CicLAvia::Application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  
  # devise_for :users, ActiveAdmin::Devise.config
  # ActiveAdmin.routes(self)

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'maps#index'

  resources :routes, only: [:create, :update]
end
