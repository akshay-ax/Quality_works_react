import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { CircularProgressbar } from "react-circular-progressbar";

function CallClosure() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} sx={{ marginBottom: "32px" }}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent sx={{ paddingBottom: "16px !important" }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item lg={2} sx={{ display: "flex" }} alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      marginRight: "8px",
                    }}
                  >
                    Call Closures:
                  </Typography>
                  <Typography color="#0070C0" sx={{ fontSize: "24px" }}>
                    80%
                  </Typography>
                </Grid>
                <Grid item lg={10}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={2}>
                      <Stack
                        sx={{
                          borderRight: "1px solid grey",
                          paddingRight: "16px",
                        }}
                      >
                        <Typography variant="h6">Agent Name</Typography>
                        <Typography variant="h5">Denis</Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="h6">Agent ID</Typography>
                        <Typography variant="h5">0016</Typography>
                      </Stack>
                      <Stack
                        sx={{
                          borderLeft: "1px solid grey",
                          paddingLeft: "16px",
                        }}
                      >
                        <Typography variant="h6">Calls</Typography>
                        <Typography variant="h5">100 / 100</Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "12px" }}
        >
          <Typography variant="h4" sx={{ pl: 2, mt: 4 }}>
            Call Opening
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ pl: 2 }}>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={10} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={20} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={80} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item xs={3} md={4}>
            <CircularProgressWithLabel value={90} />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pl: 4, mt: 2 }}>
          <Grid item xs={4}>
            <Typography sx={{ mb: 2 }} variant="h4">
              Additional Information
            </Typography>
            <Box className={classes.chart}></Box>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ mb: 2 }} variant="h4">
              Alternative Channels
            </Typography>
            <Box className={classes.chart}></Box>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{ mb: 2 }} variant="h4">
              Call Summarizations
            </Typography>
            <Box className={classes.chart}>
              <ProgressCircleCharts />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CallClosure;

function CircularProgressWithLabel(props) {
  return (
    <Card sx={{ boxShadow: 0, backgroundColor: "#F5F5F5" }}>
      <CardContent sx={{ pb: "16px !important" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              Hello, I am Denis Godhani , Hello, I am Denis Godhani, Hello, I am
              Denis Godhani
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                width: "56px",
                height: "56px",
              }}
            >
              <CircularProgressbar
                value={props.value}
                text={`${props.value}%`}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const ProgressCircleCharts = (props) => {
  const options = {
    chart: {
      type: "variablepie",
    },
    title: {
      // w w w  . de mo2  s .  c o  m
      text: "",
    },
    subtitle: {
      text: `<div style='font-size: 40px'>20%</div>low`,
      align: "center",
      verticalAlign: "middle",
      style: {
        textAlign: "center",
      },
      x: 0,
      y: -2,
      useHTML: true,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        enableMouseTracking: false,
        innerSize: "80%",
        dataLabels: {
          enabled: false,
        },
        data: [
          {
            y: 20,
            color: "#D65654",
          },
          {
            y: 80,
            color: "#ECEFF1",
          },
        ],
      },
    ],
  };
  const classes = useStyles();
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    chart: {
      borderRadius: "4px",
      border: "1px solid #E0E0E0",
      background: "#FFFFFF",
    },
    button: {
      border: "1px solid #338DCD",
      background: "#E6F1F9",
      color: "black",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      padding: "8px 16px",
    },
    card: {
      boxShadow: "none",
      backgroundColor: "#E6F1F9",
      borderLeft: "5px solid #66A9D9",
      borderRadius: "0px",
    },
  })
);
