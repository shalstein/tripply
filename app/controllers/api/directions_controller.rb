class Api::DirectionsController < ApplicationController
  def index
    directions = Direction.new('Little+Neck+NY', "New+Haven+CT").fetch_directions

    render json: directions 
  end
end
