Rails.application.routes.draw do
  resources :quiz, except: %i[new edit]
  resource :sessions, only: [:create, :show, :destroy]
  resources :assessment, only: [:create, :show], param: :slug
  resources :questions, except: %i[new edit]
  post "/attempt/:slug", to: "assessment#get_user"
  post "/show/:slug", to: "assessment#get_quiz"

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
 