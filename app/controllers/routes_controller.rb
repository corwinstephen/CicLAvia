class RoutesController < ApplicationController
  respond_to :json

  def create
    route = build_route
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

  def build_route
    route = Route.new(route_attributes)
    
    # Temporary, until the event system gets built out
    route.event = Event.first
    route_segments_data.each do |segment_data|
      route.route_segments.build(coordinate_array: segment_data["coordinate_array"])
    end

    return route
  end

  def route_segments_data
    JSON.parse(params[:route][:route_segments])
  rescue
    nil
  end

  def route_attributes
    params.require(:route).permit(:name, :description)
  end
end