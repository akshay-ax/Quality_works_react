import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles, styled } from "@mui/styles";
import React, { PureComponent, useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import { height, padding } from "@mui/system";
import { ProgressBar } from "react-bootstrap";
import { authFetch } from "../provider/AuthProvider";
import { useSelector } from "react-redux";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AnalayticService from "../Services/Analatics/Agents.service";

const Item = styled(Paper)(({ theme }) => ({
  padding: "1px",
  textAlign: "center",
}));

const Sentiment = () => {
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
    // authFetch("http://192.168.1.3:8000/elastic/sentiment/", dateRequestOptions)
    //   .then((res) => res.json())
    AnalayticService.SantimentData(
      storeData.LOB_id,
      storeData.Team_id,
      storeData.Agent_id
    ).then((res) => {
      setDataSource(res.data);
      console.log(res.data);
      console.log(res.data["call start sentiment (Agent)"]);
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
        <Grid container spacing={2} sx={{ pl: 4, mt: 2 }}>
          <Grid item xs={4} sx={{ height: "294px" }}>
            <Box sx={{ p: 3 }} className={classes.chart}>
              <Typography sx={{ mb: 3 }} variant="h5">
                Call Start
              </Typography>
              <CallDetails
                value={dataSource["call start  sentiment (Agent)"]}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 3 }} className={classes.chart}>
              <Typography sx={{ mb: 3 }} variant="h5">
                Call Ending
              </Typography>
              <CallDetails value={dataSource["call end sentiment (Agent)"]} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ p: 3 }} className={classes.chart}>
              <Typography sx={{ mb: 3 }} variant="h5">
                Overall
              </Typography>
              <CallDetails value={dataSource["Overall sentiment(Agent)"]} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ transform: "rotate(270deg)", width: "250px", height: "50px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default Sentiment;

var labels = ["Positive", " Neutral", " Nagative"];

const CallDetails = (props) => {
  console.log(props);
  const classes = useStyles();
  const opts = {
    chart: {
      type: "column",
      polar: true,
      height: "150px",
    },

    title: {
      margin: 50,
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
      tickInterval: 50,
      labels: {
        formatter: function () {
          switch (this["pos"]) {
            case 0:
              return "<h2>positive</h2>";

            case 50:
              return "<h2>positive</h2>";

            case 100:
              return "<h2>positive</h2>";
          }

          //   if(this["pos"]==)
          //   return labels[this["pos"]];
          //   // for (let i = 1; i <= 3; i++) {
          //   //   return labels[this.pos - i];
          //   // }
        },
      },
      title: {
        text: " ",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        pointWidth: 35,
        dataLabels: {
          enabled: true,
          format: "{point.y:05f}%",
        },
      },
    },

    // tooltip: {
    //   // enbaled: false, tooltip: {
    //   enabled: false
    //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    //   pointFormat:
    //     '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    // },

    series: [
      {
        name: "",
        colorByPoint: true,
        data: [
          {
            color: "#ECEFF1",
            name: "",
            y: 100,
            grouping: false,
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          {
            color: "#D65654",
            name: "",
            y: props.value,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        sx={{ height: "150px" }}
        options={opts}
      />
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
