class AssessmentController < ApplicationController

  def show
    quiz = Quiz.find_by(slug: params[:slug])
    @questions = Question.where(quiz_id: @quiz.id).map do |question|
      {
        question: question,
        options: question.options
      }
    end 
    render status: :ok, json: { quiz: @quiz, questions: @questions.as_json }
  end
end