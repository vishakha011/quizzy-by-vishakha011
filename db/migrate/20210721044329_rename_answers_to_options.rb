class RenameAnswersToOptions < ActiveRecord::Migration[6.1]
  def change
    rename_table :answers, :options
  end
end
