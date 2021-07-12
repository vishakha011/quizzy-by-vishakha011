class QuizController < ApplicationController
  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    quiz = Quiz.new(quiz_params);
    if quiz.save
      render status: :ok, json: {notice: t('successfully_created') }
    else
      errors = poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  private
    def quiz_params
      params.require(:quiz).permit(:name)
    end
end
