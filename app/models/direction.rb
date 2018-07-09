class Direction 
    include ActiveModel::Model


    def self.fetch_directions 
        destination = "555+Crown+St+Brooklyn+New+York"
        origin = "Morristown+NJ"
        # directions = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{origin}&destination=#{destination}key={ENV[google_directions_key]}"
        
        directions = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{origin}&destination=#{destination}"

        JSON.parse directions.body
        
    end
end
