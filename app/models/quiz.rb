class Quiz < ApplicationRecord
  belongs_to :user

  has_many :questions, dependent: :destroy, foreign_key: :quiz_id
  validates :name, presence: true, length: {maximum: 50}

  def self.get_slug(name)
    name_slug = name.parameterize
    slug_count = Quiz.where("slug like '#{name_slug}%'").count
    if slug_count == 0
      name_slug
    else
      "#{name_slug}-#{slug_count + 1}"
    end
  end

end
