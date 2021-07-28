class QuizLoggerJob < ApplicationJob
  queue_as :default

  def perform(quiz)
    puts "Created a quiz with following attributes :: #{quiz.attributes}"
  end
end
