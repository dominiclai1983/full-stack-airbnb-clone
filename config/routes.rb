Rails.application.routes.draw do
  root to: 'static_pages#home'

  #Property API
  get '/property/:id'          => 'static_pages#property'
  get '/property/:username'    => 'static_pages#get_property_by_user_id'

  get '/booking'               => 'static_pages#booking'
  get '/booking/:id'           => 'static_pages#get_booking_details_by_booking_id'

  get '/rental'                => 'static_pages#get_booking_details_by_user_id'

  get '/account'               => 'static_pages#get_accout_by_user_id'
  get '/account/changepw'      => 'static_pages#change_password' 
                                  #I know this one is super difficlut. But I want to try. 

  get '/login'                 => 'static_pages#login'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    delete '/sessions'             => 'sessions#destroy'

    get '/authenticated'           => 'sessions#authenticated'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end
