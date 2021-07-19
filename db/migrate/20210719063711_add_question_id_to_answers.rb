class AddQuestionIdToAnswers < ActiveRecord::Migration[6.1]
  def change
    add_column :answers, :question_id, :integer
    add_foreign_key :answers, :questions, column: :question_id, on_delete: :cascade
  end
end
