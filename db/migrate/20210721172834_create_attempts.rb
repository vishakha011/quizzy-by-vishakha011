class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|
      t.integer :quiz_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      t.boolean :submitted, default: false, null: false
      t.timestamps
    end
  end
end
