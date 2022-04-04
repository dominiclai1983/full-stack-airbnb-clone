class AddDisptachToBookings < ActiveRecord::Migration[6.1]
  def change
    add_column :bookings, :dispatch, :boolean, :default => false
  end
end
