Rails.application.routes.draw do
  resources :quiz, except: %i[new edit]
  resource :sessions, only: [:create, :show, :destroy]
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
 