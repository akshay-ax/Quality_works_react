import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useEffect, useState } from "react";
import { authFetch } from "../provider/AuthProvider";
import { useSelector } from "react-redux";
import AnalayticService from "../Services/Analatics/Agents.service";

function CallClosure() {
  const storeData = useSelector((state: any) => state?.FilterReducer?.data);
  const classes = useStyles();
  const [CallClosureData, setCallClosureData] = useState<any>();

  useEffect(() => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     Agent_id: storeData.Agent_id,
    //     Team_id: storeData.Team_id,
    //     Lob_id: storeData.LOB_id,
    //   }),
    // };
    // authFetch("http://192.168.1.3:8000/elastic/callclosure/", requestOptions)
    //   .then((res) => res.json())
    AnalayticService.CallCloserData(
      storeData.Agent_id,
      storeData.Team_id,
      storeData.LOB_id
    ).then((res) => {
      setCallClosureData(res.data);
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
          {CallClosureData &&
            CallClosureData.Call_Opening.map((item) => {
              return (
                <Grid item lg={4} xl={4}>
                  <CircularProgressWithLabel value={item} />
                </Grid>
              );
            })}
          {/* <Grid item xs={3} md={4}>
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
          </Grid> */}
        </Grid>
        <Grid container spacing={2} sx={{ pl: 4, mt: 2 }}>
          <Grid item xs={12}>
            <Box className={classes.chart} sx={{ mt: 1, pt: 5, pl: 5, pr: 5 }}>
              <EmpathyCharts value={CallClosureData} />
            </Box>
            {/* <Typography sx={{ mb: 2 }} variant="h4">
              Additional Information
            </Typography>
            <Box className={classes.chart}></Box> */}
          </Grid>
          {/* <Grid item xs={4}>
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
          </Grid> */}
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
            <Typography variant="subtitle1">{props.value.key}</Typography>
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
                value={props.value.value}
                text={`${props.value.value}%`}
                styles={buildStyles({
                  pathColor: props.value.color,
                  textColor: "#000000",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const EmpathyCharts = (props) => {
  console.log(props);
  const classes = useStyles();
  const opts = {
    chart: {
      type: "bar",
      height: "300px",
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
            name: "Additional Information",
            y: props.value?.Additional_Information,
            color: props.value?.Additional_Information_color,
          },
          {
            name: "Alternative Channels",
            y: props.value?.Alternative_Channels,
            color: props.value?.Alternative_Channels_color,
          },
          {
            name: "Call Summarizations",
            y: props.value?.Call_Summarizations,
            color: props.value?.Call_Summarizations_color,
          },
        ],
      },
      {
        name: "Medium",
        color: "#F8DA77",
      },
      {
        name: "Low",
        color: "#D65654",
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </div>
  );
};

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
