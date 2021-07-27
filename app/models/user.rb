class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  enum role: {standard: 0, administrator: 1}

  has_many :quizzes, dependent: :destroy, foreign_key: :user_id
  has_many :attempts, dependent: :destroy

  has_secure_password

  
  validates :role, inclusion: {in: roles.keys, message: :invalid }
  validates :first_name, presence: true, length: {maximum: 50}
  validates :last_name, presence: true, length: {maximum: 50}
  validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX }
  validates :password, presence: true, confirmation: true, length: {minimum: 6}
  validates :password_confirmation, presence: true, on: :create
  
  
  
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end