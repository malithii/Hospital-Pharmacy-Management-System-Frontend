import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import fullReport from "../../../images/fullReport.png";

const ViewFullReport = () => {
  return (
    <Box>
      <TitleBar
        image={fullReport}
        title="Detailed Report"
        description="View Detailed Report"
      />
    </Box>
  );
};

export default ViewFullReport;
