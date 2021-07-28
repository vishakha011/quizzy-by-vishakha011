class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def self.to_csv
    attributes = %w{quiz_name user_name email correct_answers incorrect_answers}
    CSV.generate(headers: true) do |csv|
      csv << attributes

      all.each do |attempts|
        csv << [
          attempts.quiz.name,
          "#{attempts.user.first_name} #{attempts.user.last_name}",
          attempts.user.email,
          attempts.correct_answers,
          attempts.wrong_answers
        ]
      end
    end
  end
end
