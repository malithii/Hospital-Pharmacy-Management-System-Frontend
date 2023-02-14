import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { inventoryChart } from "../../App/inventoryService";

const InventoryChart = () => {
  const [chartDetails, setChartDetails] = useState([]);
  const user = useSelector((state) => state.loginHPMS._id);

  useEffect(() => {
    inventoryChart({ user: user }, (response) => {
      console.log(response);
      setChartDetails(response.inventory);
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "white",
        pt: 2,
        pl: 2,
        pr: 2,
        borderRadius: 3,
        height: "380px",
      }}
    >
      <Chart
        type="bar"
        width="100%"
        height="100%"
        options={{
          chart: {
            id: "basic-bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              dataLabels: {
                position: "bottom", // top, center, bottom
              },
            },
          },

          xaxis: {
            categories: chartDetails.map((item) => item.drug),
            labels: {
              show: false,
            },
          },
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value < 200) {
                return " #cd6155 ";
              } else {
                return " #5dade2 ";
              }
            },
          ],
          dataLabels: {
            enabled: true,
          },
          title: {
            text: "Inventory",
            align: "left",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#263238",
            },
          },
        }}
        series={[
          {
            name: "series-1",
            data: chartDetails.map((item) => item.quantity),
          },
        ]}
      />
    </Box>
  );
};

export default InventoryChart;
