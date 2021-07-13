class QuizController < ApplicationController
  before_action :load_quiz, only: [:show, :update]

  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    quiz = Quiz.new(quiz_params);
    if quiz.save
      render status: :ok, json: {notice: t('successfully_created') }
    else
      errors = @quiz.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  def show
    render status: :ok, json: { quiz: @quiz }
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: 'Successfully updated quiz' }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  # def update
  #   if @quiz.update(quiz_params)
  #     render status: :ok, json: {notice: "Quiz updated successfully!"}
  #   else
  #     errors = @quiz.errors.full_messages
  #     render status: :unprocessable_entity, json: { errors: errors }
  #   end
  # end

  private
  def quiz_params
    params.require(:quiz).permit(:name)
  end

  def load_quiz
    @quiz = Quiz.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
  end
end
