import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { PureComponent, useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { padding } from "@mui/system";
import { authFetch } from "../provider/AuthProvider";
import { useSelector } from "react-redux";
import AnalayticService from "../Services/Analatics/Agents.service";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function SoftSkills() {
  const storeData = useSelector((state: any) => state?.FilterReducer?.data);
  const classes = useStyles();
  const [dataSource, setDataSource] = useState<any>({});
  let [loading, setLoading] = useState<boolean>(true);
  let [color, setColor] = useState("#D65654");

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
    // authFetch("http://192.168.1.3:8000/elastic/softskill/", dateRequestOptions)
    //   .then((res) => res.json())
    AnalayticService.SoftSkillData(
      storeData.LOB_id,
      storeData.Team_id,
      storeData.Agent_id
    ).then((res) => {
      setDataSource(res.data);
      console.log(res.data);
      setLoading(false);
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
              <Box
                className={classes.chart}
                sx={{ mt: 1, pt: 5, pl: 5, pr: 5 }}
              >
                <EmpathyCharts value={dataSource} />
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ mt: 3 }}>
            Communication
          </Typography>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={6}>
              <Box
                className={classes.chart}
                sx={{ padding: "25px 25px 15px 25px" }}
              >
                <RateOfSpeechCharts value={dataSource} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                className={classes.chart}
                sx={{ padding: "25px 25px 15px 25px" }}
              >
                <VoiceVolumeCharts value={dataSource} />
              </Box>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 0.5 }} spacing={2}>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <Typography variant="h4" sx={{ mt: 3, ml: 3, mb: 2 }}>
                  Curiosity
                </Typography>
                <SemiCircleBar
                  value={dataSource.Curiousity}
                  color={dataSource.Curiousity_color}
                  range={dataSource.Curiousity_range}
                />
                {/* <CircularProgressbarWithChildren
                  className={classes.semiCircle}
                  value={dataSource.Curiousity}
                  // color={props.value.Curiousity_color}
                  circleRatio={0.5}
                  strokeWidth={3}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "butt",
                    trailColor: "#eee",
                    pathColor: dataSource.Curiousity_color,
                  })}
                >
                  <div style={{ marginTop: 400 }}>
                    <strong style={{ fontSize: 28 }}>
                      {dataSource.Curiousity}%
                    </strong>
                    <br />
                    <h6 style={{ fontSize: 16, fontWeight: 500 }}>
                      {dataSource.Curiousity_range}
                    </h6>
                  </div>
                </CircularProgressbarWithChildren> */}
                {/* {dataSource.Curiousity_range} */}
                {/* <Typography className={classes.typography}>
                  {dataSource.Curiousity_range}{" "}
                </Typography> */}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <Typography variant="h4" sx={{ mt: 3, ml: 3, mb: 2 }}>
                  Clarity
                </Typography>
                <SemiCircleBar
                  value={dataSource.Clarity}
                  color={dataSource.Clarity_color}
                  range={dataSource.Clarity_range}
                />
                {/* <CircularProgressbarWithChildren
                  className={classes.semiCircle}
                  value={dataSource.Clarity}
                  // color={props.value.Curiousity_color}
                  circleRatio={0.5}
                  strokeWidth={3}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "butt",
                    trailColor: "#eee",
                    pathColor: dataSource.Clarity_color,
                  })}
                >
                  <div style={{ marginTop: 400 }}>
                    <strong style={{ fontSize: 28 }}>
                      {dataSource.Clarity}%
                    </strong>
                    <br />
                    <h6 style={{ fontSize: 16, fontWeight: 500 }}>
                      {dataSource.Clarity_range}
                    </h6>
                  </div>
                </CircularProgressbarWithChildren> */}
                {/* <Typography className={classes.typography}>
                  {dataSource.Clarity_range}{" "}
                </Typography> */}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box className={classes.chart}>
                <Typography variant="h4" sx={{ mt: 3, ml: 3, mb: 2 }}>
                  Responsiveness
                </Typography>
                <SemiCircleBar
                  value={dataSource.Responsiveness}
                  color={dataSource.Responsiveness_color}
                  range={dataSource.Responsiveness_range}
                />
                {/* <CircularProgressbarWithChildren
                  className={classes.semiCircle}
                  value={dataSource.Responsiveness}
                  // color={props.value.Curiousity_color}
                  circleRatio={0.5}
                  strokeWidth={3}
                  styles={buildStyles({
                    rotation: 0.75,
                    strokeLinecap: "butt",
                    trailColor: "#eee",
                    pathColor: dataSource.Responsiveness_color,
                  })}
                >
                  <div style={{ marginTop: 400 }}>
                    <strong style={{ fontSize: 28 }}>
                      {dataSource.Responsiveness}%
                    </strong>
                    <br />
                    <h6 style={{ fontSize: 16, fontWeight: 500 }}>
                      {dataSource.Responsiveness_range}
                    </h6>
                  </div>
                </CircularProgressbarWithChildren> */}
                {/* <Typography className={classes.typography}>
                  {dataSource.Responsiveness_range}{" "}
                </Typography> */}
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
  console.log(props);
  var data = [
    {
      name: "Done",
      y: props.value,
      color: `${props.color}`,
      dataLabels: {
        enabled: false,
      },
    },
    {
      name: "To do",
      y: 100 - props.value,
      color: "#dddddd",
      dataLabels: {
        enabled: false,
      },
    },
  ];
  const opts = {
    chart: {
      plotBorderWidth: 0,
      height: "250px",
    },
    credits: {
      enabled: false,
    },
    title: {
      margin: 50,
      text: `${props.value}%`,
      align: "center",
      verticalAlign: "middle",
      y: 20,
      style: {
        fontWeight: 700,
        fontSize: "32px",
        fontFamily: "Roboto",
        color: "#00000",
      },
    },
    subtitle: {
      text: `${props.range}`,
      align: "center",
      verticalAlign: "middle",
      y: 35,
      style: {
        fontWeight: "normal",
        fontSize: "14px",
        fontFamily: "Roboto",
        color: "#757575",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: { fontWeight: "bold", color: "white" },
        },
        startAngle: -90,
        endAngle: 90,
        center: ["50%", "70%"],
        size: "150%",
      },
    },
    series: [{ type: "pie", name: "Value", innerSize: "93%", data: data }],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={opts} />
    </div>
  );
};

const EmpathyCharts = (props) => {
  console.log(props);
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
            name: "Curiosity",
            y: props.value.Curiousity,
            color: props.value.Curiousity_color,
          },
          {
            name: "Paraphrasing",
            y: props.value.Paraphrasing,
            color: props.value.Paraphrasing_color,
          },
          {
            name: "Listening",
            y: props.value["Active Listening"],
            color: props.value["Active Listening_color"],
          },
          {
            name: "Probing",
            y: props.value.Probing,
            color: props.value.Probing_color,
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

const RateOfSpeechCharts = (props) => {
  console.log(props);
  const options = {
    chart: {
      type: "area",
      events: {
        load: function () {
          var chart = this,
            // points = chart.series[0].points,
            maxValue,
            chosenPoint;
          console.log(chart);

          // points.forEach(function (point, index) {
          //   if (!maxValue || maxValue < point.y) {
          //     maxValue = point.y;
          //     chosenPoint = point;
          //   }
          // });

          // chosenPoint.update({
          //   marker: {
          //     symbol:
          //       "url(https://www.highcharts.com/samples/graphics/sun.png)",
          //   },
          // });
        },
      },
    },
    yAxis: {
      min: 80,
      max: 250,
      tickInterval: 50,
      labels: {
        format: "{value}",
      },
      title: {
        text: "",
      },
    },

    title: {
      margin: 25,
      text: "Rate of Speech",
      align: "left",
      style: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#212121",
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
      min: props.value.min_rate_of_speech,
    },
    credits: {
      enabled: false,
    },

    //   tooltip: {
    //     formatter: function() {
    //         return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name;
    //     }
    // },

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
        name: "Avg ROS: Fast",
        marker: {
          symbol: "triangle",
        },
      },
      {
        name: "Avg WPM: 120",
        color: "#4CC57E",
        data: props.value.rate_of_speech,
        marker: {
          symbol: "triangle",
        },
      },
      {
        name: "language: English",
        marker: {
          symbol: "triangle",
        },
      },
    ],
  };
  // const opts = {
  //   chart: {},
  //   title: {
  //     text: "Rate of Speech",
  //     align: "left",
  //   },
  //   xAxis: {
  //     labels: { enabled: false },
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   plotOptions: {
  //     series: {
  //       lineWidth: 3,
  //       fillOpacity: 0.5,
  //       shadow: {
  //         color: "#ffffff",
  //         width: 1,
  //         opacity: 1,
  //         offsetY: 3,
  //         offsetX: 0,
  //       },
  //       marker: {
  //         fillColor: "#FFFFFF",
  //         lineWidth: 2,
  //         lineColor: null, // inherit from series
  //       },
  //     },
  //   },

  //   series: [
  //     {
  //       name: "Max WPM",
  //       data: [
  //         29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
  //         95.6, 54.4,
  //       ],
  //     },
  //   ],
  // };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

const VoiceVolumeCharts = (props) => {
  const opts = {
    chart: {
      type: "area",
      // title: "Rate of Speech",
    },
    title: {
      margin: 25,
      text: "Voice Volume",
      align: "left",
      style: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#212121",
      },
    },
    xAxis: {
      labels: { enabled: false },
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
      area: {
        fillColor: "#FFECE6",
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
        name: "Avg Volume: 50Db",
        color: "#D65654",
        data: props.value.voice_volume,
        marker: {
          symbol: "triangle",
        },
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
    typography: {
      marginTop: "-85px",
      marginLeft: "162px",
    },
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
        height: "325px",
        paddingTop: "30px",
        paddingRight: "70px",
        paddingLeft: "70px",
      },
      "& .CircularProgressbar-text": {
        fontSize: "8px",
        fill: "#212121",
      },
    },
  })
);
