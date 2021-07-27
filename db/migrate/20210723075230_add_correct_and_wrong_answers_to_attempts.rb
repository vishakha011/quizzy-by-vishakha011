class AddCorrectAndWrongAnswersToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :correct_answers, :integer, default: 0, null: false
    add_column :attempts, :wrong_answers, :integer, default: 0, null: false
  end
end
