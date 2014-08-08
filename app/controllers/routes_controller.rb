class RoutesController < ApplicationController
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