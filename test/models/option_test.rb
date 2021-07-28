# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: 1, password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.new(name: "Science Quiz", user: @user)
    @question = Question.new(question: "This is a test question", correct_answer: "2", quiz: @quiz)
    @option = Option.new(option: "2", question: @question)
    Option.delete_all
  end

  def test_option_should_be_invalid_without_content
    @option.option = ""
    assert @option.invalid?
  end

  def test_valid_option_should_be_saved
    assert_difference "Option.count" do
      @option.save
    end
  end
end

