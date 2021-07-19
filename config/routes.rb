Rails.application.routes.draw do
  resources :quiz, except: %i[new edit]
  resource :sessions, only: [:create, :show, :destroy]
  resources :questions, except: %i[new edit]
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
 