class Attempt < ApplicationRecord
  belongs_to :quiz, optional: true
  belongs_to :user, optional: true
end