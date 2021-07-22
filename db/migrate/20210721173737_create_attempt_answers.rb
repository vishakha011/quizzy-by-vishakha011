class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.integer :attempt_id, null: false, index: true
      t.integer :question_id, null: false, index: true
      t.integer :option_id, null: false, index: true
      t.timestamps
    end
  end
end
