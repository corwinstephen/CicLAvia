class RoutesController < ApplicationController
  respond_to :json

  def create
    route = Route.new(route_attributes)
    
    # Temporary, until the event system gets built out
    route.event = Event.first
    route_segments_data = JSON.parse(params[:route][:route_segments])
    route_segments_data.each do |segment_data|
      route.route_segments.build(coordinate_array: segment_data["coordinate_array"])
    end

    route.save

    respond_with route
  end

  def update
    route = Route.find(params[:id])
    if route.update_attributes(route_attributes)
      render json: route.to_json
    else
      render json: { error: "Unable to update route" }, status: 500
    end
  end

  private

  def route_attributes
    params.require(:route).permit(:name, :description)
  end
end