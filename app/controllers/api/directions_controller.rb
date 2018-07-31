class Api::DirectionsController < ApplicationController
  def index
    directions = Direction.new(direction_params.to_h).fetch_directions
    

    
    render json: directions 
  end

  private 

  def direction_params 
    params.permit(:origin, :destination)
  end
end
