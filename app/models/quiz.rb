class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy, foreign_key: :quiz_id
  has_many :attempts, dependent: :destroy

  validates :name, presence: true, length: {maximum: 50}  
  validates :slug, uniqueness: true

  before_save :set_slug

  private

    def set_slug
      itr = 1
      loop do
        name_slug = name.parameterize
        slug_candidate = itr > 1 ? "#{name_slug}-#{itr}" : name_slug
        break self.slug = slug_candidate unless Quiz.exists?(slug: slug_candidate)
        itr += 1
      end
    end

end