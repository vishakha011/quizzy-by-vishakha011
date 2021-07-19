class ApplicationController < ActionController::Base
include CurrentUserConcern

  skip_before_action :verify_authenticity_token

  private
    def check_current_user
      if !@current_user
        render status: :unauthorized, json: { error: 'Could not authenticate. Please login again.' }
      end
    end

end