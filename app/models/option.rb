class Option < ApplicationRecord
  belongs_to :question, optional: true

  validates :option, presence: true
end