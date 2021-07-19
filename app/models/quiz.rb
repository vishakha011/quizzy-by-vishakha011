class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy, foreign_key: :quiz_id
  validates :name, presence: true, length: {maximum: 50}  
end