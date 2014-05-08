class MapsController < ApplicationController
  def index
  end

  def new
  end

  def create
    map = Map.new(map_params)
    if map.save
      flash[:success] = "#{map.name} map created"
    else
      flash[:error] = "There was an error creating that map"
    end

    redirect_to maps_path
  end

  def show
    @map = Map.find(params[:id])
  end

  private

  def map_params
    params.require(:map).permit(:name, :description)
  end
end