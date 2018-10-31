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
        #     f.puts directions.to_json 
        # end

                
        if directions['status'] == 'OK'
            parse_steps(directions)

        else
            {directions_status: directions['status']}
        end
        
    end



    private

    def get_polyline_color weather_id 
        if  (weather_id  < 300 )
            #thunderstorm
            'red'
        elsif (weather_id < 600)
            #rain
            'blue'
        elsif (weather_id  < 700) 
            #snow
            'brown'
        else 
            'green'
        end
    end

    def parse_steps(directions)
        leg = directions['routes'][0]['legs'][0]
        
        meter_counter = 0
        weatherReports = []
        polylines = [{}]
        
        first_step_weather = get_weather(leg['steps'][0]['start_location'])
        weatherReports.prepend(first_step_weather)
        
         weather_color = get_polyline_color(first_step_weather['id'])

         polylines[0]['color'] = weather_color
         polylines[0]['path'] = leg['steps'][0]['polyline']['points']

        steps = leg['steps'].map do |step|
            polyline = step['polyline']['points']
            
            if (meter_counter + step['distance']['value']) >= 100000 
                points = GoogleMapsService::Polyline.decode(polyline)
                points_distance = 0

                (points.length - 1).times do |index|
                   points_distance += SphericalUtil.computeDistanceBetween(points[index], points[index + 1])
                    if (points_distance + meter_counter) >= 100000
                       
                        meter_counter = 0
                        points_distance = 0
                        weather_report = get_weather(points[index + 1].stringify_keys)
                        weather_color = get_polyline_color(weather_report['id'])
                        weatherReports << weather_report
                        
                        

                    end
                end 
                polylines << {path: polyline, color: weather_color}
                meter_counter += points_distance
                {html_instructions: step['html_instructions'], duration: step['duration']['text']}               
            else
                polylines << {path: polyline, color: weather_color}
                meter_counter += step['distance']['value']
                {html_instructions: step['html_instructions'], duration: step['duration']['text']}
            end
        end


        mapBounds = directions['routes'][0]['bounds']

       { weather: weatherReports, directions: {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: steps, destination: leg['end_address'],  origin: leg['start_address']}, mapData:{ polylines: polylines, bounds: mapBounds, start_location: leg['start_location'], end_location: leg['end_location']}, directions_status: directions['status']}
    end

    def get_weather(coordinates)
        response = Faraday.get("https://api.openweathermap.org/data/2.5/weather?lat=#{coordinates['lat']}&lon=#{coordinates['lng']}&APPID=#{ENV['WEATHER_API_KEY']}&units=metric")
        weather = JSON.parse(response.body)

        { temp: weather['main']['temp'], visibility: weather['visibility'], city_name: weather['name'], location: coordinates}.merge(weather['weather'][0])
    end

    def step_with_weather(step)

    end
end

