class Option < ApplicationRecord
  belongs_to :question, optional: true
  has_many :attempt_answers, dependent: :destroy
  
  validates :option, presence: true
end