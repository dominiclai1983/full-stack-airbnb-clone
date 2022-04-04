module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_booking_by_id
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      if session
        @booking = session.user.bookings.find(params[:id])
        render 'api/bookings/success', status: :created
      else
        render json: {bookings: []}
      end
       
    end

    def booking_mark_dispatch
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session 
        @booking = session.user.bookings.find_by(id: params[:id])

        @booking.dispatch = true
        if @booking.save(:validate => false)
          render json: { success: true }
        else
          render json: { success: false }
        end

      else
        render json: { success: false }
      end
    end

    def rental_sort_by_upcoming

      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        id = session.user.id
        @bookings = Booking.joins(property: :user).where(user: {id: id}).where("start_date > ?", Date.today)
        #@bookings = all_bookings.where("end_date > ? ", Date.today)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end
    end

    def rental_sort_by_completed

      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        id = session.user.id
        @bookings = Booking.joins(property: :user).where(user: {id: id}).where("start_date < ?", Date.today)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end
    end

    def get_property_upcoming_bookings

      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        property = Property.find_by(id: params[:id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property

        @bookings = property.bookings.where("end_date > ? ", Date.today)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end

    end

    def get_property_completed_bookings

      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        property = Property.find_by(id: params[:id])
        return render json: { error: 'cannot find property' }, status: :not_found if !property

        @bookings = property.bookings.where("end_date < ? ", Date.today)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end
    
    end

    def booking
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
    
      if session
        @bookings = session.user.bookings
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end
       
    end

    def booking_sort_by_upcoming
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        @bookings = session.user.bookings.where('start_date > ?', DateTime.now)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end

    end

    def booking_sort_by_completed
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        @bookings = session.user.bookings.where('start_date < ?', DateTime.now)
        render 'api/bookings/index'
      else
        render json: {bookings: []}
      end

    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end