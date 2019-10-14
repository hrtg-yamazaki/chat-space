FactoryBot.define do
  factory :message do
    body   {Faker::Lolem.sentence}
    image  {File.open("#{Rails.root}/pubric/images/test_image.png")}
    user   
    group  
  end
end
