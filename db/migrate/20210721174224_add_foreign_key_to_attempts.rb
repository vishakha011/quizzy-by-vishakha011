class AddForeignKeyToAttempts < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :attempts, :quizzes, column: :quiz_id, on_delete: :cascade
    add_foreign_key :attempts, :users, column: :user_id, on_delete: :cascade
  end
end
