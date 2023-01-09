import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import reports from "../../../images/reports.png";

const PharmacyReports = () => {
  return (
    <Box>
      <TitleBar image={reports} title="Reports" description="View Reports" />
      
    </Box>
  );
};

export default PharmacyReports;
