# require "minitest/autorun"
require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: 0, password: "welcome", password_confirmation: "welcome")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_user_should_be_invalid_without_first_name
    @user.first_name = ''
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_user_should_be_invalid_without_last_name
    @user.last_name = ''
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = 'a' * 50
    assert @user.valid?
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = 'a' * 50
    assert @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ''
    assert_not @user.valid?

    @user.save
    assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!
  
    test_user = @user.dup
    assert_not test_user.valid?
  
    assert_equal ['Email has already been taken'],
                  test_user.errors.full_messages
  end

  def test_email_should_be_saved_in_lowercase
    uppercase_email = "SAM@EXAMPLE.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_reject_email_of_invalid_length
    @user.email = ('a' * 50) + '@test.com'
    assert @user.invalid?
  end

  def test_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
                      first.last@example.in user+one@example.ac.in]
  
    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end
  
  def test_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
                        @sam-sam.com sam@sam+exam.com fishy+#.com]
  
    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
  end

  def test_user_should_have_valild_role
    @user.role = 1
    assert @user.valid?
  end

  def test_user_should_not_be_saved_without_password
    @user.password = nil
    assert_not @user.save
    assert_equal ["Password can't be blank"],
                  @user.errors.full_messages
  end
  
  def test_user_should_not_be_saved_without_password_confirmation
    @user.password_confirmation = nil
    assert_not @user.save
    assert_equal ["Password confirmation can't be blank"],
                  @user.errors.full_messages
  end

  def test_user_should_not_be_saved_without_password_matching_confirm_password
    @user.password = "123456"
    assert_not @user.save
    assert_equal ["Password confirmation doesn't match Password", "Password confirmation doesn't match Password"], @user.errors.full_messages
  end

  def test_user_should_not_be_saved_without_valid_password_length
    @user.password = "123"
    assert_not @user.save
    assert_equal ["Password confirmation doesn't match Password", "Password confirmation doesn't match Password", "Password is too short (minimum is 6 characters)"], @user.errors.full_messages
  end

end