require "test_helper"

class AnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: 1, password: "welcome", password_confirmation: "welcome")
    @quiz = Quiz.new(name: 'Science Quiz', user: @user)
    @question = Question.new(question: "This is a test question", correct_answer: "2", quiz: @quiz)
    @answer = Answer.new(answer: '2', question: @question)
    Answer.delete_all
  end


  def test_answer_should_be_invalid_without_content
    @answer.answer = ''
    assert @answer.invalid?
  end
  

  def test_valid_answer_should_be_saved
    assert_difference 'Answer.count' do
      @answer.save
    end
  end


end