class CreateLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :logs do |t|
      t.integer :quiz_id
      t.text :messgae
      t.timestamps
    end
  end
end
