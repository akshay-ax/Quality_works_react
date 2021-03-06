import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { PureComponent } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { padding } from "@mui/system";

function ProcessKnowledge() {
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
                    Process Knowledge:
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
          <Typography variant="h4">Information</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.chart} sx={{ mt: 1 }}>
                <Information />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Asssistance
          </Typography>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <Tagging />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <CallTransferRate />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Fixes
          </Typography>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <Typography variant="h5" sx={{ p: 2 }}>
                  Troubleshooting
                </Typography>
                <ProgressCircleCharts />
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* <Box className={classes.chart}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ width: "200px" }}>Plan Details:</Typography>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" value={30} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >{`${Math.round(30)}%`}</Typography>
                  </Box>
                </Box>
              </Box> */}
            </Grid>
            {/* <Grid item xs={4}>
              <Box className={classes.chart}>
                <SemiCircleBar value={40} />
              </Box>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProcessKnowledge;

const ProgressCircleCharts = (props) => {
  const options = {
    chart: {
      type: "variablepie",
    },
    credits: {
      enabled: false,
    },
    title: {
      // w w w  . de mo2  s .  c o  m
      text: "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    subtitle: {
      text: `<div style='font-size: 40px'>65%</div> Fixed issues`,
      align: "center",
      verticalAlign: "middle",
      style: {
        textAlign: "center",
      },
      x: 0,
      y: -2,
      useHTML: true,
    },
    // legend: {
    //   layout: "vertical",
    //   align: "right",
    // },
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
            name: "Fixed",
            y: 65,
            color: "#4CC57E",
          },
          {
            name: "Pandding",
            y: 25,
            color: "#F8DA77",
          },
          {
            name: "Not Fixed",
            y: 10,
            color: "#D65654",
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

const Information = () => {
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
            name: "Accuracy",
            y: 60,
          },
          {
            name: "Critical Miss",
            y: 30,
          },
          {
            name: "Non-Critical Miss",
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

const Tagging = () => {
  return (
    <div>
      <Typography variant="h5" sx={{ p: 2 }}>
        Taging
      </Typography>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>deactivation:</Typography>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={72} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              72
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>Plan Details:</Typography>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={30} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              30
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>PORT:</Typography>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={80} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              80
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>Signal:</Typography>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={20} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              20
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>Activate:</Typography>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={90} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              90
            )}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const CallTransferRate = () => {
  const opts = {
    chart: {
      // title: "Rate of Speech",
    },
    title: {
      text: "Call Transfer Rate",
      align: "left",
      fontFamily: "Roboto",
      fontStyle: "normal",
      // font-weight: 500;
      fontSize: "16px",
      // line-height: 24px;
    },
    xAxis: {
      title: {
        text: "Date",
      },
      type: "datetime",
      tickInterval: 1000 * 3600 * 24 * 30,
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
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
        name: "Max Volume",
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
