module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def get_property_by_user_id
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        @properties = session.user.properties
        render 'api/properties/index', status: :ok
      else
        render json: {properties: []}
      end
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

      if session
        user = session.user
        @property = user.properties.new(property_params)

        if @property.save 
          render 'api/properties/show', status: :ok
        else
          render json: {properties: []}
        end

      else
        render json: {properties: []}
      end

    end

    def edit
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)

        if session 
          @property = Property.find_by(id: params[:id])
          
          if @property and @property.update(task_params)
            render 'api/tasks/show'
          else
            render json: { success: false }
          end
    
        else
          render json: { success: false }
        end

    end

    private

      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, 
          :price_per_night, :max_guests, :bedrooms, :beds, :baths)
      end

  end
end