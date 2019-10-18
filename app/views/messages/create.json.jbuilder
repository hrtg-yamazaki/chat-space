json.body @message.body
json.image @message.image.url if @message.image.present?  
json.user_name @message.user.name
json.timestamp @message.created_at.strftime("%Y/%m/%d %H:%M")