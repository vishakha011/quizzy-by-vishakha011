class QuestionsController < ApplicationController
  before_action :load_question, only: [:show, :update, :destroy]

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
    @question = Question.new(question_params)
    if @question.save
      render status: :ok, json: { notice: "Successfully created question" }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def show
    render status: :ok, json: { question: @question.as_json(include: {
      answers: {
        only: [:answer, :id]
      }
    })}
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: 'Successfully updated question' }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: 'Successfully deleted question'}
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors}
    end
  end

  private

    def question_params
      params.require(:question).permit(:question, :correct_answer, :quiz_id, :options_attributes => [:id, :option])
    end

    def load_question
      @question = Question.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
  end
end