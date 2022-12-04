import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TitleBar from "../../components/TitleBar";
import medicine1 from "../../images/medicine-1.png";
import ListComponent from "../../components/ListComponent";

const Drugs = () => {
  return (
    <Box>
      <TitleBar
        image={medicine1}
        title="Drugs"
        description="Manage drug details"
      />
      <Grid container mt={2} spacing={2}>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" pb={3}>
                General Drug Categories
              </Typography>
              <Grid container>
                <ListComponent x="6" color="#0D4C92" label="Analgesics" />
                <ListComponent x="6" color="#9A1663" label="Antacids" />
                <ListComponent
                  x="6"
                  color="#C539B4"
                  label="Antianxiety Drugs"
                />
                <ListComponent x="6" color="#B01E68" label="Antiarrhythmics" />
                <ListComponent x="6" color="#EB6440" label="Antibacterials" />
                <ListComponent x="6" color="#7743DB" label="Anticoagulants" />
                <ListComponent x="6" color="#3A8891" label="Antidepressants" />
                <ListComponent x="6" color="#FF8FB1" label="Antivirals" />
                <ListComponent x="6" color="#FD841F" label="Bronchodilators" />
                <ListComponent x="6" color="#54B435" label="Cold Cures" />
                <ListComponent x="6" color="#FF6464" label="Diuretics" />
                <ListComponent x="6" color="#5DA7DB" label="Expectorant" />
                <ListComponent x="6" color="#E0144C" label="Hormones" />
                <ListComponent
                  x="6"
                  color="#000000"
                  label="mmunosuppressives"
                />
                <ListComponent x="6" color="#00ABB3" label="Sedatives" />
                <ListComponent x="6" color="#EA047E" label="Tranquilizer" />
                <ListComponent x="6" color="#A8E890" label="Vitamins" />
                <ListComponent x="6" color="#5F9DF7" label="Hypoglycemics " />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" pb={3}>
                Store Temperature
              </Typography>
              <Grid container>
                <ListComponent
                  x="12"
                  color="#F49D1A"
                  label="1 :- Non-Refrigerated medicines: 10°- 25°C "
                />
                <ListComponent
                  x="12"
                  color="#DC3535"
                  label="2 :- Refrigerated medicines: 2°-8°C  "
                />
                <ListComponent
                  x="12"
                  color="#B01E68"
                  label="1 :- Freezing temperatures: -10°C to -25°C "
                />
              </Grid>
              <Typography variant="h5" pb={3} mt={3}>
                Levels
              </Typography>
              <Grid container>
                <ListComponent
                  x="12"
                  color="#379237"
                  label="1 :- General Medicines"
                />
                <ListComponent
                  x="12"
                  color="#FCE700"
                  label="2 :- Pharmacy Medicines"
                />
                <ListComponent
                  x="12"
                  color="#400D51"
                  label="3 :- Prescription Only "
                />
                <ListComponent
                  x="12"
                  color="#EB1D36"
                  label="4 :- Controlled drugs"
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Add New Drug</Typography>
              <Grid container>
                <Grid item lg={12}>
                  <Typography pt={1}>Drug ID</Typography>
                  <TextField
                    sx={{ mt: "0.5rem", width: "98%" }}
                    placeholder="Drug ID"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item lg={12}>
                  <Typography pt={1}>Drug Name</Typography>
                  <TextField
                    sx={{ mt: "0.5rem", width: "98%" }}
                    placeholder="Drug Name"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item lg={12}>
                  <Typography pt={1}>Description</Typography>
                  <TextField
                    sx={{ mt: "0.5rem", width: "98%" }}
                    placeholder="Description"
                    multiline
                    rows={3}
                  ></TextField>
                </Grid>
                <Grid item lg={6}>
                  <Typography pt={1}>Level</Typography>
                  <TextField
                    sx={{ mt: "0.5rem", width: "98%" }}
                    placeholder="Level"
                    size="small"
                  ></TextField>
                </Grid>
                <Grid item lg={6}>
                  <Typography pt={1}>Store Temperature</Typography>
                  <TextField
                    sx={{ mt: "0.5rem", width: "98%" }}
                    placeholder="Store Temperature"
                    size="small"
                  ></TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Drugs;
