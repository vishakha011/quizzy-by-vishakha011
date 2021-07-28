require "test_helper"
require "sidekiq/testing"

class QuizLoggerJobTest < ActiveJob::TestCase
  def setup
    @quiz = create(:quiz)
  end

  test 'logger runs once after creating a new quiz' do
    assert_enqueued_with(job: QuizLoggerJob, args: [@quiz])
    perform_enqueued_jobs
    assert_performed_jobs 1
  end

  test 'log count increments on running quiz logger' do
    Sidekiq::Testing.inline!
    assert_difference "Log.count", 1 do
      QuizLoggerJob.new.perform(@quiz)
    end
  end
end
