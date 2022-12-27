import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import iconReceived from "../../../images/recieved.png";

const WardRecieved = () => {
  return (
    <Box>
      <TitleBar
        image={iconReceived}
        title="Recieved"
        description="Recieved Details"
      />
    </Box>
  );
};
export default WardRecieved;
