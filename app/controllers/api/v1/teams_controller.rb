module Api::V1
  class TeamsController < ApplicationController
    before_action :authenticate_and_set_user
    before_action :set_team, only: [:show]

    # GET /teams
    def index
      @teams = Team.all

      render json: @teams
    end

    # GET /teams/1
    def show
      render json: @team
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_team
        @team = Team.find(params[:id])
      end
  end
end