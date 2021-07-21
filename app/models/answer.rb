class Answer < ApplicationRecord
  belongs_to :question, optional: true

  validates :answer, presence: true
end