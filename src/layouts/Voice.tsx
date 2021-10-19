import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { PureComponent } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import AddIcon from "@mui/icons-material/Add";
import { padding } from "@mui/system";

function Voice() {
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
        <Grid container spacing={2} sx={{ pl: 4, mt: 2 }}>
          <Grid item xs={6}>
            <Box className={classes.chart}>
              <CallTransferRate title="Overtalk incidents" />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className={classes.chart}>
              <CallTransferRate title="Silent incidents" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Voice;

const CallTransferRate = (props) => {
  const opts = {
    chart: {
      type: "column",
    },
    title: {
      text: props.title,
      align: "left",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "16px",
      // line-height: 24px;
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%e. %b",
        // don't display the dummy year
        // month: "%e. %b",
        // year: "%b",
      },
      title: {
        text: "days",
      },
      tickInterval: 10000 * 60 * 60 * 24 * 6,
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 50,
      labels: {
        format: "{value}%",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: "#D6F5D6",
      },
      series: {
        marker: {
          enabled: false,
          radius: 2,
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null, // inherit from series
        },
        states: {
          hover: {
            halo: {
              size: 0,
            },
          },
        },
      },
    },

    series: [
      {
        name: `Avg ${props.title}: 10`,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5],
        pointStart: Date.UTC(2021, 6, 11),
        pointInterval: 24 * 3600 * 10000 * 6, // sample interval
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </div>
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
