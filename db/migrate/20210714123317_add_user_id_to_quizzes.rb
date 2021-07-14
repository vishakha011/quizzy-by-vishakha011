class AddUserIdToQuizzes < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :user_id, :integer
    add_foreign_key :quizzes, :users, column: :user_id
  end
end
