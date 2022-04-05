Rails.application.routes.draw do

  #remember this side is from end

  root to: 'static_pages#home'

  #Property API
  get '/property/:id'              => 'static_pages#property'
  get '/property/:username'        => 'static_pages#get_property_by_user_id'

  #TODO: for the success method
  get '/booking/:id/success'       => 'static_pages#success'

  #Home Page Section
  get '/login'                     => 'static_pages#login'
  get '/signup'                    => 'static_pages#signup'

  #Account API
  get '/account/'                  => 'static_pages#account'
  get '/account/profiles'          => 'static_pages#account_home'

  get '/account/booking'           => 'static_pages#booking'
  get '/account/booking/:id'       => 'static_pages#get_booking_by_booking_id'

  get '/account/property'          => 'static_pages#user_property'
  get '/account/property/add'      => 'static_pages#add_user_property' 
  get '/account/property/:id/edit' => 'static_pages#edit_user_property' 
  get '/account/property/:id'      => 'static_pages#listing_user_property' 

  get '/account/rental'            => 'static_pages#rental'

  get '/account/*path'             => 'static_pages#wrong_path'

  #-----------------------------------------------------------------------------

  #remember the following is backend
  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]
    #TODO: let's see how those rsources work!

    delete '/sessions'              => 'sessions#destroy'

    get  '/bookings'                => 'bookings#booking_sort_by_upcoming'
    get  '/bookings/completed'      => 'bookings#booking_sort_by_completed'
    get  '/booking/:id'             => 'bookings#get_booking_by_id'
    put  '/booking/:id/dispatch'    => 'bookings#booking_mark_dispatch'

    get  '/authenticated'           => 'sessions#authenticated'

    get  '/rental'                  => 'bookings#rental_sort_by_upcoming'
    get  '/rental/properties'       => 'properties#get_property_by_user_id'
    get  '/rental/completed'        => 'bookings#rental_sort_by_completed'

    post '/properties'              => 'properties#create'
    get  '/properties'              => 'properties#index'

    get  '/properties/:id'          => 'properties#show'
    get  '/properties/:id/bookings' => 'bookings#get_property_upcoming_bookings'
    get  '/properties/:id/completed'=> 'bookings#get_property_completed_bookings'

    put  '/properties/:id'          => 'properties#edit'

    get  '/user'                    => 'users#show'

    # stripe webhook
    post '/charges/mark_complete'   => 'charges#mark_complete'
    post '/charges'                 => 'charges#create'


  end

end
