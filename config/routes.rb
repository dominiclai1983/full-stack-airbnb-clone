Rails.application.routes.draw do
  root to: 'static_pages#home'

  #Property API
  get '/property/:id'             => 'static_pages#property'
  get '/property/:username'       => 'static_pages#get_property_by_user_id'

  get '/account/changepw'         => 'static_pages#change_password' 
                                  #I know this one is super difficlut. But I want to try. 

  get '/login'                    => 'static_pages#login'
  get '/signup'                   => 'static_pages#signup'

  #Account API
  get '/account'                  => 'static_pages#account'

  get '/account/booking'          => 'static_pages#booking'
  get '/account/booking/:id'      => 'static_pages#get_booking_by_booking_id'


  get '/account/property'         => 'static_pages#user_property'
  get '/account/property/add'     => 'static_pages#add_user_property' 
  #a form to let user add new property

  get '/account/rental'           => 'static_pages#rental'
  get '/account/rental/:id'       => 'static_pages#get_rental_by_booking_id'


  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    delete '/sessions'             => 'sessions#destroy'

    get '/bookings'                => 'bookings#booking_sort_by_upcoming'
    get '/bookings/completed'      => 'bookings#booking_sort_by_completed'

    get '/authenticated'           => 'sessions#authenticated'
    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/properties'              => 'properties#get_property_by_user_id'      

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'

  end

end
