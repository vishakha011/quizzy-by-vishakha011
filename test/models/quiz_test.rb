# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: 1, password: "welcome",
      password_confirmation: "welcome")
    @quiz = Quiz.new(name: "Science Quiz", user: @user)
    Quiz.delete_all
  end

  def test_quiz_invalid_without_name
    @quiz.name = ""
    assert @quiz.invalid?
    assert_equal ["Name can't be blank"], @quiz.errors.full_messages
  end

  def test_name_should_be_of_valid_length
    @quiz.name = "a" * 51
    assert @quiz.invalid?
  end
end

