import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Order = () => {
  const columns = [
    { field: "id", headerName: "Drug ID", width: 150 },
    { field: "firstName", headerName: "Drug Name", width: 150 },
    { field: "lastName", headerName: "BHT", width: 150 },
    {
      field: "age",
      headerName: "Amount",
      type: "number",
      width: 150,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 34 },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  return (
    <Box>
      <Typography variant="h5" pb={3} pt={2}>
        ORDER DRUGS
      </Typography>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <Card sx={{ p: 3 }}>
            <Typography pl={1} pt={1}>
              Date
            </Typography>
            <TextField
              sx={{ paddingLeft: "7px", mt: "0.5rem", width: "100%" }}
              placeholder="Date"
              size="small"
            ></TextField>
          </Card>
        </Grid>
        <Grid item lg={8}></Grid>
        <Grid item lg={4}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item lg={12}>
                  <Typography pl={1} pt={1}>
                    Drug ID
                  </Typography>
                  <TextField
                    sx={{ paddingLeft: "7px", mt: "0.5rem", width: "98%" }}
                    placeholder="Drug ID"
                    size="small"
                  />
                </Grid>
                <Grid item lg={12}>
                  <Typography pl={1} pt={1}>
                    Drug Name
                  </Typography>
                  <TextField
                    sx={{ paddingLeft: "7px", mt: "0.5rem", width: "98%" }}
                    placeholder="Drug Name"
                    size="small"
                  ></TextField>
                </Grid>

                <Grid item lg={12}>
                  <Typography pl={1} pt={1}>
                    Amount
                  </Typography>
                  <TextField
                    sx={{ paddingLeft: "7px", mt: "0.5rem", width: "98%" }}
                    placeholder="Amount"
                    size="small"
                  ></TextField>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Button
                size="large"
                variant="outlined"
                style={{ marginRight: "27px", width: "200px" }}
              >
                Clear
              </Button>
              <Button
                size="large"
                variant="contained"
                style={{ marginRight: "27px", width: "200px" }}
              >
                Add
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item lg={8}>
          <Card>
            {/* <div style={{ height: "300px", width: "100%" }}> */}
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[5]}
              checkboxSelection
              autoHeight
            />
            {/* </div> */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
