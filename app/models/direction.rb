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
        steps = @directions['routes'][0]['legs'][0]['steps']
        steps.map do |step|
            remove_style(step['html_instructions'])
        end
    end

    def remove_style(instruction)
        instruction.gsub(/style=.?".*?"/, '')
    end






end

