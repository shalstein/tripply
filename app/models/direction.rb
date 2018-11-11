require 'google_maps_service/polyline'

class Direction 
    include ActiveModel::Model
    attr_accessor :origin, :destination

    def initialize(addresses_hash)
        @origin = addresses_hash['origin'] 
        @destination = addresses_hash['destination']
    end

    def fetch_directions 

        response = Faraday.get "https://maps.googleapis.com/maps/api/directions/json?origin=#{@origin}&destination=#{@destination}&key=#{ENV['google_directions_key']}"
        
        directions = JSON.parse(response.body)

        # open('google_dirV2.json', 'w') do |f|
        #     f.puts directions.to_json 
        # end
        if directions['status'] == 'OK'
            data = divide_polylines_and_parse_directions(directions['routes'][0])
            data['directions_status'] = directions['status']
            puts @n_counter
            data
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

    def split_points_to_100km(points, polyline_distance_counter)
        points_distance_counter = 0
        one_hundered_km_points = []
        previous_index = 0
        (points.length - 1).times do |current_index|
            points_distance_counter += SphericalUtil.computeDistanceBetween(points[current_index], points[current_index + 1])
            if points_distance_counter + polyline_distance_counter >= 100000
                one_hundered_km_points << points[previous_index..current_index]
                previous_index = current_index
            end
        end
        {divided_points: one_hundered_km_points, remaining_km: points_distance_counter, remaining_points: points[previous_index..-1]}
    end

    def construct_encoded_polyline_with_color(decoded_polyline, weather_id)
        {points: GoogleMapsService::Polyline.encode(decoded_polyline), color: get_polyline_color(weather_id)}
    end

    def divide_polylines_and_parse_directions(route)
        polyline_distance_counter = 0
        polyline_temp_bucket = []
        divided_polylines = []
        directions = []
        leg = route['legs'][0]
        leg['steps'].each do |step|
            polyline_distance = step['distance']['value']
            points = GoogleMapsService::Polyline.decode(step['polyline']['points'])
            if polyline_distance + polyline_distance_counter >= 100000
                divided_points_with_counter = split_points_to_100km(points, polyline_distance_counter)
                one_hundered_km_points = polyline_temp_bucket.flatten.concat(divided_points_with_counter[:divided_points].flatten)
                weather_report = get_weather(one_hundered_km_points[0])
                divided_polylines << construct_encoded_polyline_with_color(one_hundered_km_points, weather_report['id'])
                polyline_temp_bucket = divided_points_with_counter[:remaining_points] 
                polyline_distance_counter = divided_points_with_counter[:remaining_km]
            else
              polyline_temp_bucket << points
              polyline_distance_counter += polyline_distance
            end
            directions << {html_instructions: step['html_instructions'], duration: step['duration']['text']}
        end
        destination_weather = get_weather(polyline_temp_bucket[-1][-1])
        divided_polylines << construct_encoded_polyline_with_color(polyline_temp_bucket.flatten, destination_weather['id'])

        
        { directions: {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: directions, destination: leg['end_address'],  origin: leg['start_address'] }, mapData: { polylines: divided_polylines, bounds: route['bounds'], start_location: leg['start_location'], end_location: leg['end_location']}}
    end

    def get_weather(coordinates)
        stringify_coordinates = coordinates.stringify_keys
        response = Faraday.get("https://api.openweathermap.org/data/2.5/weather?lat=#{stringify_coordinates['lat']}&lon=#{stringify_coordinates['lng']}&APPID=#{ENV['WEATHER_API_KEY']}&units=metric")
        weather = JSON.parse(response.body)
        
        # open('weather.json', 'a') do |f|
        #     f.puts weather.to_json 
        # end        

        # { temp: weather['main']['temp'], visibility: weather['visibility'], city_name: weather['name'], location: coordinates}.merge(weather['weather'][0])
        weather['weather'][0]
    end

end

