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
end