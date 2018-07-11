class Direction 
    include ActiveModel::Model

    attr_accessor :origin, :destination

    def initialize(origin, destination)
        @origin = origin
        @destination = destination
    end

    def fetch_directions 

        response = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{@origin}&destination=#{@destination}key={ENV[google_directions_key]}"
    
        @directions = JSON.parse(response.body)
        parse_steps
        
    end

    private

    def parse_steps
        leg = @directions['routes'][0]['legs'][0]
        steps = leg['steps']

        sanitized_steps = steps.map do |step|
            ActionView::Base.full_sanitizer.sanitize(step['html_instructions'])
        end


        {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: sanitized_steps}

    end

end

