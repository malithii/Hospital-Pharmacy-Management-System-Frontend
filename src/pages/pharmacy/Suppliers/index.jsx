import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../../components/TitleBar";
import supplierIcon from "../../../images/supplier.png";

const Suppliers = () => {
  return (
    <Box>
      <TitleBar
        image={supplierIcon}
        title="Supliers"
        description="Manage supplier details"
      />
      <Grid container></Grid>
    </Box>
  );
};

export default Suppliers;
