class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :question, null: false
      t.string :correct_answer, null: false
      t.timestamps
    end
  end
end
