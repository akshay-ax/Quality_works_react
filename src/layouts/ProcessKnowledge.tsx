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
import React, { PureComponent, useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { padding } from "@mui/system";
import { authFetch } from "../provider/AuthProvider";
import { useSelector } from "react-redux";
import AnalayticService from "../../src/Services/Analatics/Agents.service";

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 1200, // Tablet/Laptop
    lg: 1400, // Desktop
    xl: 1500,
  },
};

function ProcessKnowledge() {
  const storeData = useSelector((state: any) => state?.FilterReducer?.data);
  const classes = useStyles();
  const [dataSource, setDataSource] = useState<any>({});

  useEffect(() => {
    // const dateRequestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     Agent_id: storeData.Agent_id,
    //     Team_id: storeData.Team_id,
    //     Lob_id: storeData.LOB_id,
    //   }),
    // };
    // authFetch(
    //   "http://192.168.1.3:8000/elastic/process_knowledge/",
    //   dateRequestOptions
    // )
    //   .then((res) => res.json())
    AnalayticService.ProcessKnowledgeData(
      storeData.Agent_id,
      storeData.Team_id,
      storeData.LOB_id
    ).then((res) => {
      setDataSource(res.data);
      console.log(res.data);
    });
  }, []);

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
              <Box
                className={classes.chart}
                sx={{ mt: 1, pt: 5, pl: 5, pr: 5 }}
              >
                <Information value={dataSource} />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ mt: 5 }}>
            Assistance
          </Typography>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={6}>
              <Box className={classes.chart}>
                <Tagging value={dataSource} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                className={classes.chart}
                sx={{ padding: "23px 25px 15px 25px" }}
              >
                <CallTransferRate value={dataSource} />
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
                <ProgressCircleCharts value={dataSource} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* <Box className={classes.chart}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ width: "200px" pl:2 }}>Plan Details:</Typography>
                  <Box sx={{ width: "100%", mr: ,pr:2 }}>
                    <LinearProgress  value={30} />
                  </Box>
                  <Box sx={{ minWidth: 35, mr:2 }}>
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
      text: `<div style='font-size: 40px'>${props.value.Troubleshooting}%</div> Fixed issues`,
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
            y: props.value.Troubleshooting,
            color: "#4CC57E",
          },
          {
            name: "Pandding",
            y: (100 - props.value.Troubleshooting) / 2,
            color: "#F8DA77",
          },
          {
            name: "Not Fixed",
            y: (100 - props.value.Troubleshooting) / 2,
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

const Information = (props) => {
  const classes = useStyles();
  const opts = {
    chart: {
      type: "bar",
      height: "300px",
      // events: {
      //   load() {
      //     showLoading("Simulating Ajax ...");
      //     setTimeout(hideLoading(), 2000);
      //   },
      // },
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
      labels: {
        y: -8,
        style: {
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "14px",
          color: "#616161",
        },
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 20,
      labels: {
        format: "{value}%",
      },
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      series: {
        pointWidth: 40,
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
        color: "#4CC57E",
        data: [
          {
            name: "Accuracy",
            y: props.value["Information accuracy"],
            color: props.value["Information accuracy_color"],
          },
          {
            name: "Critical Miss",
            y: props.value["Critical miss"],
            color: props.value["Critical miss_color"],
          },
          {
            name: "Non-Critical Miss",
            y: props.value["Non-critical miss"],
            color: props.value["Non-critical miss_color"],
          },
        ],
      },
      { name: "Medium", color: "#F8DA77" },
      { name: "Low", color: "#D65654" },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </div>
  );
};

const Tagging = (props) => {
  return (
    <div>
      <Typography variant="h5" sx={{ p: 2 }}>
        Taging
      </Typography>
      <Divider></Divider>
      <Box sx={{ height: "384px", overflowY: "scroll" }}>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Deactivation
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  borderRadius: "8px",
                  backgroundColor: "#ECEFF1",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "8px",
                    backgroundColor: props.value.Deactivation_color,
                  },
                }}
                variant="determinate"
                value={props.value.Deactivation}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Deactivation)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Plan Details
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  color: props.value.Deactivation_color,
                  borderRadius: "8px",
                  backgroundColor: "#ECEFF1",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value["Plan Details_color"],
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value["Plan Details"]}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value["Plan Details"]
              )}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              PORT
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "8px",
                    backgroundColor: props.value.PORT_color,
                  },
                }}
                variant="determinate"
                value={props.value.PORT}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value.PORT
              )}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Signal
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "8px",
                    backgroundColor: props.value.Signal_color,
                  },
                }}
                variant="determinate"
                value={props.value.Signal}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Signal)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Activate
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value.Activate_color,
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value.Activate}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Activate)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Activate
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value.Activate_color,
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value.Activate}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Activate)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Activate
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value.Activate_color,
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value.Activate}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Activate)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Activate
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value.Activate_color,
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value.Activate}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Activate)}%`}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider></Divider>
        <Box sx={{ width: "100%", p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="caption" sx={{ width: "200px", pl: 2 }}>
              Activate
            </Typography>
            <Box sx={{ width: "100%", mr: 1, pr: 2 }}>
              <LinearProgress
                sx={{
                  height: "8px",
                  backgroundColor: "#ECEFF1",
                  borderRadius: "8px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: props.value.Activate_color,
                    borderRadius: "8px",
                  },
                }}
                variant="determinate"
                value={props.value.Activate}
              />
            </Box>
            <Box sx={{ minWidth: 35, mr: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >{`${Math.round(props.value.Activate)}%`}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const CallTransferRate = (props) => {
  const opts = {
    chart: {
      type: "area",
      // title: "Rate of Speech",
    },
    title: {
      margin: 34,
      text: "Call Transfer Rate",
      align: "left",
      style: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#212121",
        fontSize: "0.875rem",
        [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
          fontSize: "0.875rem",
        },
        [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
          fontSize: "0.75rem",
        },
      },
      // line-height: 24px;
    },
    xAxis: {
      title: {
        text: "days",
      },
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "",
      },
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
        name: `Avg Call Transfer Rate: ${48}%`,
        data: props.value.call_transfer_rate,
        pointStart: Date.UTC(2021, 0, 1),
        pointInterval: 6 * 3600 * 10000,
        marker: { symbol: "triangle" },
        color: "#4CC57E",
        // marker: {
        //   enabled: true,
        //   symbol: "triangle",
        // },
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
