class AssessmentController < ApplicationController
  skip_before_action :check_current_user
  skip_before_action :check_current_user_is_admin
  before_action :load_quiz, only: [:get_quiz, :get_user]

  def create
    attempted = Attempt.new(attempt_params)
    if attempted.save!
      render status: :ok, json: { notice: "You have successfully completed the quiz"}
    else
      errors = attempted.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  def get_quiz
    questions = Question.where(quiz_id: @quiz.id).map do |question|
      {
        question: question,
        options: question.options
      }
    end
    attempted = Attempt.find_by({ quiz_id: @quiz.id, user_id: params["user"]["id"] })
    if attempted
      @results = AttemptAnswer.where(attempt_id: attempted.id )
    end
    render status: :ok, json: { quiz: @quiz, questions: questions, attempted: attempted, results: @results}
  end

  def get_user
    user = User.find_by(email: params["user"]["email"])
    if !user 
      user = User.new(first_name: params["user"]["first_name"], last_name:  params["user"]["last_name"], email: params["user"]["email"], password: "welcome", password_confirmation: "welcome")
      user.save!
      attempt_count = Attempt.where(quiz_id: @quiz.id, user_id: user.id).count
      render status: :ok, json: { user: user, is_attempted: attempt_count, quiz: @quiz }
    else
      attempt_count = Attempt.where(quiz_id: @quiz.id, user_id: user.id).count
      render status: :ok, json: { user: user, is_attempted: attempt_count, quiz: @quiz }
    end
  end

  private
    def attempt_params
      params.require(:assessment).permit(:quiz_id, :user_id, :submitted, :correct_answers, :wrong_answers, :attempt_answers_attributes => [:id, :question_id, :option_id])
    end

    def load_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end

end