require 'google_maps_service/polyline'

class Direction 
    include ActiveModel::Model

    attr_accessor :origin, :destination

    def initialize(addresses_hash)
        @origin = addresses_hash['origin'] 
        @destination = addresses_hash['destination']
        #gmaps = GoogleMapsService::Client.new(key: ENV['google_directions_key'])        
    end

    def fetch_directions 

        response = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{@origin}&destination=#{@destination}&key=#{ENV['google_directions_key']}"
        
        directions = JSON.parse(response.body)

        # open('google_dir.json', 'w') do |f|
        #     f.puts @directions.to_json 
        #   end

                
        if directions['status'] == 'OK'
            parse_steps(directions)

        else
            {status: directions['status']}
        end
        
    end



    private

    def parse_steps(directions)
        leg = directions['routes'][0]['legs'][0]
        meter_counter = 0

        steps = leg['steps'].map do |step|
            if (meter_counter + step['distance']['value']) >= 100000
                polyline = step['polyline']['points']
                points = GoogleMapsService::Polyline.decode(polyline)
                weatherReports = []
                points_distance = 0

                (points.length - 1).times do |index|
                   points_distance += SphericalUtil.computeDistanceBetween(points[index], points[index + 1])
                    if (points_distance + meter_counter) >= 100000    
                        puts 'meter counter is greater than 100000'                        
                       
                        meter_counter = 0
                        points_distance = 0
                        weatherReports << get_weather(points[index + 1].stringify_keys)
                    end
                end 

                meter_counter += points_distance
                {html_instructions: step['html_instructions'], duration: step['duration']['text'], weather: weatherReports}               
            else
                meter_counter += step['distance']['value']
                {html_instructions: step['html_instructions'], duration: step['duration']['text']}
            end
        end

        steps[0]['weather'] = [get_weather(leg['steps'][0]['start_location'])]    

        {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: steps, destination: leg['end_address'],  origin: leg['start_address'], status: directions['status']}

    end

    def get_weather(coordinates)
        response = Faraday.get("https://api.openweathermap.org/data/2.5/weather?lat=#{coordinates['lat']}&lon=#{coordinates['lng']}&APPID=#{ENV['WEATHER_API_KEY']}&units=metric")

        weather = JSON.parse(response.body)
        puts weather

        {weather: weather['weather'][0], temp: weather['main']['temp'], visibility: weather['visibility']}
    end

    def step_with_weather(step)

    end
end

