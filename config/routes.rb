Rails.application.routes.draw do
  namespace :api do
    get 'directions/', to: 'directions#index'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'client#main'
end
