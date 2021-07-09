class SessionsController < ApplicationController
 include CurrentUserConcern

  def create
    user = User.find_by(email: login_params[:email].downcase)
    if user.present? && user.authenticate(login_params[:password])
      session[:user_id] = user.id
      render status: :ok, json: { loggedIn: true, userId: user.id, userName: user.first_name, userEmail: user.email }
    else
      render status: :unauthorized, json: {
        notice: 'Incorrect credentials, try again.'
      }
    end
   end

   def show
    if @current_user
      render json: { loggedIn: true, userId: @current_user.id, userName: @current_user.first_name, userEmail: @current_user.email }
    else
      render json: { loggedIn: false }
    end
   end

   def destroy
    reset_session
    render json: { status: 200, logged_out: true}
   end


  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end