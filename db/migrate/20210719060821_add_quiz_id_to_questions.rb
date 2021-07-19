class AddQuizIdToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :quiz_id, :integer
    add_foreign_key :questions, :quizzes, column: :quiz_id, on_delete: :cascade
  end
end
