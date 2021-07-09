class QuizController < ApplicationController
  def index
    quizzes = Quiz.all
    render status: :ok, json: { quizzes: quizzes }
  end
end
