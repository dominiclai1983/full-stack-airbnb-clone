class PropertySerializer < ActiveModel::Serializer

   include Rails.application.routes.url_helpers

   attributes :id, :title, :description, :city, :country, :property_type, 
   :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image

   def image
      if object.image.attached?
         rails_blob_url(object.featured_image)
   end
end
