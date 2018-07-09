class Api::DirectionsController < ApplicationController
  def index
    directions = Direction.fetch_directions
    render json: directions 
  end
end
