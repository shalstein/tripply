class Direction 
    include ActiveModel::Model

    attr_accessor :origin, :destination

    def initialize(addresses_hash)
        @origin = addresses_hash['origin'] 
        @destination = addresses_hash['destination'] 
    end

    def fetch_directions 

        response = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{@origin}&destination=#{@destination}key={ENV[google_directions_key]}"

    
        @directions = JSON.parse(response.body)
        
        if @directions['status'] == 'OK'
            parse_steps

        else
            {status: @directions['status']}
        end
        
    end

    private

    def parse_steps
        leg = @directions['routes'][0]['legs'][0]
        meter_counter = 0

        steps = leg['steps'].map do |step|
            if meter_counter >= 1000 
                weather = get_weather(step['end_location'])
                meter_counter = 0
                {html_instructions: step['html_instructions'], duration: step['duration']['text'], weather: weather}
            else
                meter_counter += step['duration']['value']
                {html_instructions: step['html_instructions'], duration: step['duration']['text']}
            end
        end
        

        {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: steps, destination: leg['end_address'],  origin: leg['start_address'], status: @directions['status']}

    end




    def get_weather(coordinates)
    binding.pry
     response = Faraday.get("https://api.openweathermap.org/data/2.5/weather?lat=#{coordinates['lat']}&lon=#{coordinates['lng']}&APPID=#{ENV['WEATHER_API_KEY']}&units=metric")

     weather = JSON.parse(response.body)

     {weather: weather['weather'][0], temp: weather['main']['temp'], visibility: weather['visibility']}

    end



end

