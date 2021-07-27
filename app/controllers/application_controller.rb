class ApplicationController < ActionController::Base
include CurrentUserConcern

  skip_before_action :verify_authenticity_token
  before_action :check_current_user
  before_action :check_current_user_is_admin

  private
    def check_current_user
      if !@current_user
        render status: :unauthorized, json: { error: 'Could not authenticate. Please login again.' }
      end
    end

    def check_current_user_is_admin
      if @current_user.role == "standard"
        reset_session
        render status: :unauthorized, json: {
          error: 'You are not a authorized user.'
        }
      end
    end

end