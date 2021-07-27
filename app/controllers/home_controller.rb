class HomeController < ApplicationController
  skip_before_action :check_current_user
  skip_before_action :check_current_user_is_admin
  
  def index
    render
  end
  
end
