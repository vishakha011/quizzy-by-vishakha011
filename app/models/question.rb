class Question < ApplicationRecord 
  belongs_to :quiz
  has_many :options, dependent: :destroy, foreign_key: :question_id

  accepts_nested_attributes_for :options, allow_destroy: true

  validates :question, presence: true
  validates :correct_answer, presence: true
end