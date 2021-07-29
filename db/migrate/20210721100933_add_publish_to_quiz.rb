class AddPublishToQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :is_published, :boolean, default: false
  end
end
