import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import Table from "./Table";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import reportApi from "apis/report";

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const fetchReport = async () => {
    try {
      const response = await reportApi.list();
      setReports(response.data.reports);
      logger.info(response.data.reports);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Reports</h1>
        <Button
          type="link"
          buttonText="Download"
          iconClass="ri-download-2-line"
          path="/reports/downloads"
        />
      </div>

      {either(isNil, isEmpty)(reports) ? (
        <h1 className="text-lg leading-5 text-gray-500 text-center mt-48">
          No reports to show
        </h1>
      ) : (
        <Table reports={reports} />
      )}
    </Container>
  );
};

export default Report;
