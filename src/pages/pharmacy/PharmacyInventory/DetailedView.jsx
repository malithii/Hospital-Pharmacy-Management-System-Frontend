import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import iconInventory from "../../../images/icon-inventory-96.png";

const DetailedView = () => {
  return (
    <Box>
      <TitleBar
        image={iconInventory}
        title="Pharmacy Inventory"
        description="View Pharmacy Inventory"
      />
    </Box>
  );
};

export default DetailedView;
