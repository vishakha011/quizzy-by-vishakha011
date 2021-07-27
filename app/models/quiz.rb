class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy, foreign_key: :quiz_id
  validates :name, presence: true, length: {maximum: 50}  
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      name_slug = name.parameterize
      slug_count = Quiz.where("slug like '#{name_slug}%'").count
      if slug_count == 0
        self.slug = name_slug
      else
        self.slug = "#{name_slug}-#{slug_count + 1}"
      end
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, 'is immutable!')
      end
    end

end