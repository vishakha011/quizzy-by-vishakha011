import React, { useState } from "react";

import Button from "components/Button";

const DownloadReport = () => {
  const [getFile, setGetFile] = useState(false);

  setTimeout(() => {
    setGetFile(true);
  }, 10 * 1000);

  return (
    <div className="h-screen">
      <div className="flex flex-row items-center justify-center w-screen h-screen">
        <h1 className="text-lg leading-5 flex flex-col items-center justify-center">
          {getFile ? (
            <>
              <p>Report is now ready for download</p>
              <form action="/reports/download.csv">
                <Button type="submit" buttonText="Download Report" />
              </form>
            </>
          ) : (
            "Your report is being prepared for downloading..."
          )}
        </h1>
      </div>
    </div>
  );
};

export default DownloadReport;
