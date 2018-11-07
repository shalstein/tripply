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

    def get_weather_at_polyline_interval(points, counter)
    end

    def get_positions_of_hundered_kilometer_intervals_with_remainder(polyline, counter)
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

    def divide_polyline_to_hundered_km_with_color(steps)
        polyline_distance_counter = 0
        polyline_temp_bucket = []
        divided_polylines = []
        dircetions = []
        steps.each do |step|
            polyline_distance = step['distance']['value']
            points = GoogleMapsService::Polyline.decode(step['polyline']['points'])
            if polyline_distance + counter >= 100000
                divided_points_with_counter = split_points_to_100km(points, polyline_distance_counter)
                one_hundered_km_points = polyline_temp_bucket.flatten.concat(divided_points_with_counter['divided_points'])
                weather_report = get_weather(one_hundered_km_points[0])

                divided_polylines << construct_encoded_polyline_with_color(points, weather_report['id'])
                polyline_temp_bucket = divided_points_with_counter['remaining_points'] 
                polyline_distance_counter = divided_points_with_counter['remaining_km']
            else
              polyline_temp_bucket << points
            end
            polyline_distance_counter += polyline_distance
            directions << {html_instructions: step['html_instructions'], duration: step['duration']['text']}
        end
        destination_weather = get_weather(polyline_temp_bucket[-1])
        divided_polylines << construct_encoded_polyline_with_color(polyline_temp_bucket, destination_weather)
        {polylines: divided_polylines, directions: directions}
    end
    def parse_steps(directions)
        leg = directions['routes'][0]['legs'][0]
        polylines = []
        directions = []        
        weather_conditions = [{condition: '', start_position: '', end_position: ''}]

        counter = 0

        leg['steps'].each do  |step|
            polyline = step['polyline']['points']
            
            if counter + step['distance']['value'] >= 100000
                # polyline_intervals_and_remainder =  get_positions_of_hundered_kilometer_intervals_with_remainder(polyline, counter)

                counter = polyline_intervals_and_remainder['counter']
                positions = polyline_intervals_and_remainder['positions']
                # weather_conditions_with_polylines = update_weather_conditions_and_create_polylines(positions, weather_conditions)
                weather_reports = get_weather(positions) 
                weather_conditions = update_weather_conditions(weather_reports, weather_conditions)
                if weather_reports.length <= 1
                    polyline << {points: polyline, color: get_polyline_color(weather_reports[0]['id'])}
                else
                    break_polyline_on_100km()
                end


                weather_conditions = weather_conditions_with_polylines['weather_conditions']
                polylines = we6
            else

            end

            # polyline = {points: step['polyline']['points'], color: get_polyline_color()}
            polylines << polyline
            directions << {html_instructions: step['html_instructions'], duration: step['duration']['text']}

        end
    end


        
    #     meter_counter = 0
    #     weatherReports = []
    #     polylines = [{}]
        
    #     first_step_weather = get_weather(leg['steps'][0]['start_location'])
    #     weatherReports.prepend(first_step_weather)
        
    #      weather_color = get_polyline_color(first_step_weather['id'])

    #      polylines[0]['color'] = weather_color
    #      polylines[0]['path'] = leg['steps'][0]['polyline']['points']

    #     steps = leg['steps'].map do |step|
    #         polyline = step['polyline']['points']
            
    #         if (meter_counter + step['distance']['value']) >= 100000 
    #             points = GoogleMapsService::Polyline.decode(polyline)
    #             points_distance = 0

    #             (points.length - 1).times do |index|
    #                points_distance += SphericalUtil.computeDistanceBetween(points[index], points[index + 1])
    #                 if (points_distance + meter_counter) >= 100000
                       
    #                     meter_counter = 0
    #                     points_distance = 0
    #                     weather_report = get_weather(points[index + 1].stringify_keys)
    #                     weather_color = get_polyline_color(weather_report['id'])
    #                     weatherReports << weather_report
                        
                        

    #                 end
    #             end 
    #             polylines << {path: polyline, color: weather_color}
    #             meter_counter += points_distance
    #             {html_instructions: step['html_instructions'], duration: step['duration']['text']}               
    #         else
    #             polylines << {path: polyline, color: weather_color}
    #             meter_counter += step['distance']['value']
    #             {html_instructions: step['html_instructions'], duration: step['duration']['text']}
    #         end
    #     end


    #     mapBounds = directions['routes'][0]['bounds']

    #    { weather: weatherReports, directions: {distance: leg['distance']['text'], duration: leg['duration']['text'], steps: steps, destination: leg['end_address'],  origin: leg['start_address']}, mapData:{ polylines: polylines, bounds: mapBounds, start_location: leg['start_location'], end_location: leg['end_location']}, directions_status: directions['status']}
    # end

    def get_weather(coordinates)
        response = Faraday.get("https://api.openweathermap.org/data/2.5/weather?lat=#{coordinates['lat']}&lon=#{coordinates['lng']}&APPID=#{ENV['WEATHER_API_KEY']}&units=metric")
        weather = JSON.parse(response.body)

        # { temp: weather['main']['temp'], visibility: weather['visibility'], city_name: weather['name'], location: coordinates}.merge(weather['weather'][0])
        weather['weather'][0]
    end

    def step_with_weather(step)

    end
end

