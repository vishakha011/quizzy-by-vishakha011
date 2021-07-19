class Question < ApplicationRecord 
  belongs_to :quiz
  has_many :answers, dependent: :destroy, foreign_key: :question_id

  validates :question, presence: true
  validates :correct_answer, presence: true
end