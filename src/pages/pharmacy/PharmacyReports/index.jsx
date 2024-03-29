import { TableBar } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  drugIssueReport,
  inventoryReport,
  pharmacyDrugUsageChart,
  wardDrugUsageChart,
  wardDrugUsageReport,
} from "../../../App/reportsService";
import TitleBar from "../../../components/TitleBar";
import reports from "../../../images/reports.png";
import Chart from "react-apexcharts";
import { getDrugById } from "../../../App/drugsService";

const PharmacyReports = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();

  const user = useSelector((state) => state.loginHPMS._id);
  const userType = useSelector((state) => state.loginHPMS.type);
  const [drugUsageDetails, setDrugUsageDetails] = useState([]);
  const [drugUsageWard, setDrugUsageWard] = useState([]);
  const [inventoryDetails, setInventoryDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [wardChartData, setWardChartData] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [drug, setDrug] = useState("");

  //get month
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const req = {
    pharmacist: user,
    month: month,
    year: year,
  };

  useEffect(() => {
    drugIssueReport(req, (response) => {
      console.log(response);
      setDrugUsageDetails(response.orders);
    });
  }, []);

  useEffect(() => {
    wardDrugUsageReport(
      { user: user, month: month, year: year },
      (response) => {
        console.log(response);
        setDrugUsageWard(response.wardDrugUsage);
      }
    );
  }, []);

  useEffect(() => {
    inventoryReport({ user: user }, (response) => {
      console.log(response);
      setInventoryDetails(response.inventory);
    });
  }, []);

  useEffect(() => {
    pharmacyDrugUsageChart(
      {
        pharmacist: "63b564bcfc1d5e7994bea009",
        month: month,
        year: year,
        drug: "643d7110e03bf8a8ef22596b",
      },
      (response) => {
        console.log(response);
        setChartData(response.usage);
      }
    );
  }, []);

  useEffect(() => {
    wardDrugUsageChart(
      {
        ward: user,
        drug: "643d7110e03bf8a8ef22596b",
        month: month,
        year: year,
      },
      (response) => {
        console.log(response);
        setWardChartData(response.usage);
      }
    );
  }, []);

  useEffect(() => {
    getDrugById((response) => {
      console.log(response.drug);
      setDrugs(response.drug);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      <TitleBar image={reports} title="Reports" description="View Reports" />
      <Grid container spacing={2}>
        <Grid item lg={3.5}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              height: "500px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Drug Usage in the month of {month}/{year}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Chip label="Drug" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Quantity" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userType === "PHARMACIST"
                    ? drugUsageDetails.map((row, index) => (
                        <TableRow key={row.drug}>
                          <TableCell align="center">{row.drug}</TableCell>
                          <TableCell align="center">{row.total}</TableCell>
                        </TableRow>
                      ))
                    : drugUsageWard.map((row) => (
                        <TableRow key={row.drug.drugId}>
                          <TableCell align="center">
                            {row.drug.drugId}
                          </TableCell>
                          <TableCell align="center">{row.total}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item lg={4.5}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              height: "500px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Inventory Summary {month}/{year}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Chip label="Drug" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Available Quantity" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="Exp" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventoryDetails.map((row) => (
                    <TableRow key={row.drug}>
                      <TableCell align="center">{row.drug}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">
                        {row.batch.map((e) => {
                          return (
                            <Typography>{e.expDate.slice(0, 10)}</Typography>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box
            sx={{
              bgcolor: "white",
              p: 2,
              borderRadius: 3,
              pb: 3,
              width: "100%",
              height: "500px",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Typography variant="h7" fontWeight="bold">
              Drug Usage Charts {month}/{year}
            </Typography>
            <Button
              onClick={handlePrint}
              variant="contained"
              size="small"
              sx={{ ml: 11, height: "26px" }}
            >
              Print Reports
            </Button>
            <Autocomplete
              disablePortal
              {...register("drug", {
                required: {
                  value: true,
                  message: "Drug is required",
                },
              })}
              onChange={(e, value) => {
                setValue("drug", value);
                console.log(value);
                if (userType === "PHARMACIST") {
                  pharmacyDrugUsageChart(
                    {
                      pharmacist: user,
                      month: month,
                      year: year,
                      drug: value._id,
                    },
                    (response) => {
                      console.log(response);
                      setChartData(response.usage);
                    }
                  );
                } else {
                  wardDrugUsageChart(
                    {
                      ward: user,
                      drug: value._id,
                      month: month,
                      year: year,
                    },
                    (response) => {
                      console.log(response);
                      setWardChartData(response.usage);
                    }
                  );
                }
              }}
              id="combo-box-demo"
              getOptionLabel={(option) => option.drugId}
              options={drugs}
              sx={{
                mt: "0.5rem",
                mb: "5rem",
                width: "100%",
                ...(errors.drug && {
                  border: "1px solid red",
                }),
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    sx={{ color: "red" }}
                    {...params}
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                );
              }}
            />
            {/* apex line chart */}
            {userType === "PHARMACIST" ? (
              <Chart
                width="100%"
                series={[
                  {
                    name: "Quantity",
                    data: chartData.map((e) => e.total),
                  },
                ]}
                options={{
                  chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                      enabled: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "straight",
                  },
                  title: {
                    text: "Drug Usage Chart",
                    align: "left",
                  },
                  grid: {
                    row: {
                      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                      opacity: 0.5,
                    },
                  },
                  xaxis: {
                    categories: chartData.map((e) =>
                      e.date.slice(0, 10).slice(8, 10)
                    ),
                  },
                }}
              />
            ) : (
              <Chart
                width="100%"
                series={[
                  {
                    name: "Quantity",
                    data: wardChartData.map((e) => e.quantity),
                  },
                ]}
                options={{
                  chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                      enabled: false,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  stroke: {
                    curve: "straight",
                  },
                  title: {
                    text: "Drug Usage Chart",
                    align: "left",
                  },
                  grid: {
                    row: {
                      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                      opacity: 0.5,
                    },
                  },
                  xaxis: {
                    categories: wardChartData.map((e) =>
                      e.date.slice(0, 10).slice(8, 10)
                    ),
                  },
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PharmacyReports;
