json.booking do
  json.id @booking.id
  json.start_date @booking.start_date
  json.end_date @booking.end_date
  json.dispatch @booking.dispatch

  json.property do
    json.id @booking.property.id
    json.title @booking.property.title
  end
end