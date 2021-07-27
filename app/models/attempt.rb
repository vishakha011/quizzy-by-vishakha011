class Attempt < ApplicationRecord
  belongs_to :quiz, optional: true
  belongs_to :user, optional: true
  has_many :attempt_answers, dependent: :destroy

  accepts_nested_attributes_for :attempt_answers, allow_destroy: true
end