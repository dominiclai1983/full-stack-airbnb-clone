class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
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

  def user_property
    render 'user_property'
  end

end