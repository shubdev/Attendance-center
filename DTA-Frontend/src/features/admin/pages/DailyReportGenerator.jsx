import { useOutletContext } from "react-router-dom";
import DailyReportGenerator from "../components/DailyReportGenerator.jsx";

function DailyReportGeneratorRoute() {

  const { reportRes, reportDate, setReportDate } = useOutletContext();
  
  return (
    <DailyReportGenerator
      reportDate={reportDate}
      setReportDate={setReportDate}
      reportRes={reportRes}
    />
  );
}

export default DailyReportGeneratorRoute;
