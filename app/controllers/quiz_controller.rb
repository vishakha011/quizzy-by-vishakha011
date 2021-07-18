class QuizController < ApplicationController
  before_action :load_quiz, only: %i[show update destroy]

  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    @quiz = Quiz.new(quiz_params);
    if @quiz.save
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

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: 'Successfully deleted Quiz'}
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  private
  def quiz_params
    params.require(:quiz).permit(:name).merge(user_id: @current_user.id)
  end

  def load_quiz
    @quiz = Quiz.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
  end
end
