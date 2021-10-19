import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { PureComponent } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { padding } from "@mui/system";

function SoftSkills() {
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
                    SOFT SKILLS:
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
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="h4">Empathy</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.chart} sx={{ mt: 1 }}>
                <EmpathyCharts />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Communication
          </Typography>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <RateOfSpeechCharts />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <VoiceVolumeCharts />
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <SemiCircleBar value={50} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <SemiCircleBar value={80} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <SemiCircleBar value={40} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SoftSkills;

const SemiCircleBar = (props) => {
  const classes = useStyles();
  return (
    <>
      <CircularProgressbar
        className={classes.semiCircle}
        value={props.value}
        text={`${props.value}%`}
        circleRatio={0.5}
        strokeWidth={3}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: "butt",
          trailColor: "#eee",
        })}
      />
    </>
  );
};

const EmpathyCharts = () => {
  const classes = useStyles();
  const opts = {
    chart: {
      type: "bar",
    },
    title: {
      text: "",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      labels: {
        format: "{value}%",
      },
      title: {
        text: "Total percent market share",
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}%",
        },
      },
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },

    series: [
      {
        name: "High",
        colorByPoint: true,
        data: [
          {
            name: "Curiosity",
            y: 45,
          },
          {
            name: "Paraphrasing",
            y: 35,
          },
          {
            name: "Listening",
            y: 80,
          },
          {
            name: "Probing",
            y: 20,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </div>
  );
};

const RateOfSpeechCharts = () => {
  const options = {
    chart: {
      type: "area",
    },
    title: {
      text: "Example Chart",
      style: {
        color: "#00000",
      },
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      borderWidth: 0,
      backgroundColor: "#FFFFFF",
    },

    xAxis: {
      labels: { enabled: false },
    },
    tooltip: {
      shared: false,
      valueSuffix: "points",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        lineWidth: 3,
        fillOpacity: 0.5,
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
        name: "Max WPM",
        color: "#D6F5D6",
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
    ],
  };
  const opts = {
    chart: {},
    title: {
      text: "Rate of Speech",
      align: "left",
    },
    xAxis: {
      labels: { enabled: false },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        lineWidth: 3,
        fillOpacity: 0.5,
        shadow: {
          color: "#ffffff",
          width: 1,
          opacity: 1,
          offsetY: 3,
          offsetX: 0,
        },
        marker: {
          fillColor: "#FFFFFF",
          lineWidth: 2,
          lineColor: null, // inherit from series
        },
      },
    },

    series: [
      {
        name: "Max WPM",
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

const VoiceVolumeCharts = () => {
  const opts = {
    chart: {
      type: "area",
      // title: "Rate of Speech",
    },
    title: {
      text: "Voice Volume",
      align: "left",
    },
    xAxis: {
      labels: { enabled: false },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        lineWidth: 3,
        fillOpacity: 0.5,
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
        name: "Max Volume",
        color: "#FFECE6",
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
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
    empathChart: {
      "&.highcharts-root": {
        paddingTop: "35px ",
        paddingRight: "35px",
        paddingLeft: "35px",
      },
    },
    card: {
      boxShadow: "none",
      backgroundColor: "#E6F1F9",
      borderLeft: "5px solid #66A9D9",
      borderRadius: "0px",
    },
    semiCircle: {
      "&.CircularProgressbar": {
        height: "285px",
        paddingTop: "70px",
        paddingRight: "70px",
        paddingLeft: "70px",
      },
    },
  })
);
