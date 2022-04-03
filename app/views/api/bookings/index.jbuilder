json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.title booking.property.title
    json.image_url booking.property.image_url
    json.propertyID booking.property_id
    json.username booking.user.username
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.days (booking.end_date - booking.start_date).to_i
  end
end