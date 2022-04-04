class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def success
    @booking = { booking_id:params[:id] }.to_json
    render 'success'
  end

  def login
    render 'login'
  end

  def signup
    render 'signup'
  end

  def account
    render 'account'
  end



  def account_home
    render 'account_home'
  end

  def user_property
    render 'user_property'
  end

  def booking
    render 'booking'
  end

  def add_user_property
    render 'add_property'
  end

  def edit_user_property
    render 'edit_property'
  end

  def listing_user_property
    render 'listing_property'
  end

  def rental
    render 'rental'
  end

  def wrong_path
    render 'wrong_path'
  end

end