class PropertySerializer < ActiveModel::Serializer

   attributes :id, :title, :description, :city, :country, :property_type, 
   :price_per_night, :max_guests, :bedrooms, :beds, :baths, :updated_at

   def updated_at
      object.updated_at.to_date
   end
end
