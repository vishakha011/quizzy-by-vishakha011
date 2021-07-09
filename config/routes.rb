Rails.application.routes.draw do
  resources :quiz, only: :index
  # resources :users, only: %[create index]
  resource :sessions, only: [:create, :show, :destroy]
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
 