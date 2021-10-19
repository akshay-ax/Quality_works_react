import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles, styled } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import ReactWordcloud from "react-wordcloud";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const Item = styled(Paper)(({ theme }) => ({
  padding: "1px",
  textAlign: "center",
}));

const Keywords = () => {
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
                <Grid item xs={2} sx={{ display: "flex" }} alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      marginRight: "8px",
                    }}
                  >
                    KEYWORDS:
                  </Typography>
                  <Typography color="#0070C0" sx={{ fontSize: "24px" }}>
                    80%
                  </Typography>
                </Grid>
                <Grid item xs={3}>
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
        <Grid container spacing={2} sx={{ pl: 2, mt: 2 }}>
          <Grid item xs={6}>
            <Box sx={{ p: 5 }} className={classes.chart}>
              <Typography sx={{ mb: 2 }} variant="h5">
                KeyWord Cloud
              </Typography>
              <TagCloudComp />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 5 }} className={classes.chart}>
              <Typography sx={{ mb: 2 }} variant="h5">
                Keyword Count
              </Typography>
              <KeywordCount />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pl: 2, mt: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ p: 5 }} className={classes.chart}>
              <Typography sx={{ mb: 2 }} variant="h5">
                Keyword Trend
              </Typography>
              <KeywordTrend />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Keywords;

const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
  {
    text: "correct",
    value: 10,
  },
  {
    text: "day",
    value: 54,
  },
  {
    text: "prescription",
    value: 12,
  },
  {
    text: "time",
    value: 77,
  },
  {
    text: "thing",
    value: 45,
  },
  {
    text: "left",
    value: 19,
  },
  {
    text: "pay",
    value: 13,
  },
  {
    text: "people",
    value: 32,
  },
  {
    text: "month",
    value: 22,
  },
  {
    text: "again",
    value: 35,
  },
  {
    text: "review",
    value: 24,
  },
  {
    text: "call",
    value: 38,
  },
  {
    text: "doctor",
    value: 70,
  },
  {
    text: "asked",
    value: 26,
  },
  {
    text: "finally",
    value: 14,
  },
  {
    text: "insurance",
    value: 29,
  },
  {
    text: "week",
    value: 41,
  },
  {
    text: "called",
    value: 49,
  },
  {
    text: "problem",
    value: 20,
  },
  {
    text: "going",
    value: 59,
  },
  {
    text: "help",
    value: 49,
  },
  {
    text: "felt",
    value: 45,
  },
  {
    text: "discomfort",
    value: 11,
  },
  {
    text: "lower",
    value: 22,
  },
  {
    text: "severe",
    value: 12,
  },
  {
    text: "free",
    value: 38,
  },
  {
    text: "better",
    value: 54,
  },
  {
    text: "muscle",
    value: 14,
  },
  {
    text: "neck",
    value: 41,
  },
  {
    text: "root",
    value: 24,
  },
  {
    text: "adjustment",
    value: 16,
  },
  {
    text: "therapy",
    value: 29,
  },
  {
    text: "injury",
    value: 20,
  },
  {
    text: "excruciating",
    value: 10,
  },
  {
    text: "chronic",
    value: 13,
  },
  {
    text: "chiropractor",
    value: 35,
  },
];

const TagCloudComp = () => {
  const options: any = {
    rotations: 0,
  };
  return (
    <div>
      <ReactWordcloud words={words} options={options} />
    </div>
  );
};

const KeywordTrend = () => {
  const options = {
    title: {
      text: "Multiple Line Chart",
    },

    chart: {
      height: null,
    },

    legend: {
      y: -40,
    },

    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
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
        name: "Tarnsaction Fail",
        data: [
          6.14, 18.92, 123.57, 236.64, 39.23, 24.05, 30.1, 35.86, 48.56, 516.4,
          494.13, 695.25,
        ],
      },
      {
        name: "UPI",
        data: [
          1.14, 15.92, 13.57, 266.64, 389.23, 284.05, 330.1, 335.86, 448.56,
          16.4, 44.13, 695.25,
        ],
      },
      {
        name: "Money",
        data: [
          305.234, 387.124, 578.573, 768.474, 789.234, 844.05, 676.1, 735.86,
          748.56, 916.4, 894.13, 995.25,
        ],
      },
    ],

    credits: {
      enabled: false,
    },
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

const KeywordCount = () => {
  return (
    <div>
      <Divider></Divider>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ width: "200px" }}>transaction Fail:</Typography>
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
          <Typography sx={{ width: "200px" }}>UPI:</Typography>
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
          <Typography sx={{ width: "200px" }}>Fail:</Typography>
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
          <Typography sx={{ width: "200px" }}>SBI:</Typography>
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
          <Typography sx={{ width: "200px" }}>PhonePE:</Typography>
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
