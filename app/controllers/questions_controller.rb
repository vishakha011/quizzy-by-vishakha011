class QuestionsController < ApplicationController
  def index
    questions = Question.all
    render status: :ok, json: { questions: questions.as_json(include: {
      options: {
        only: [:option, :id]
      }
    }) 
  }
  end

  def create
    @question = Question.create(question_params)
    if @question
      render status: :ok, json: { notice: "Successfully created question" }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(:question, :correct_answer, :quiz_id, :options_attributes => [:id, :option])
    end

end