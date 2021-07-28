class ReportController < ApplicationController
  def index
    reports = Attempt.all
    render status: :ok, json: { reports: reports.as_json(include: {
      quiz: {
        only: [:name, :id]
      },
      user: {
        only: [:first_name, :last_name, :email]
    }
    })
  }
  end

  def create_csv
    reports = Attempt.all.order("created_at desc")
    respond_to do |format|
      format.html
      format.csv { send_data reports.to_csv, filename: "report.csv" }
    end
  end
end