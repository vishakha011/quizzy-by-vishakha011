class Log < ApplicationRecord
  validates :message, presence: true
  validates :quiz_id, presence: true
end
