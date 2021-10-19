import PropTypes from "prop-types";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import { DateRange } from "@mui/lab/DateRangePicker";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { createStyles, makeStyles } from "@mui/styles";
import { authFetch } from "../provider/AuthProvider";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Salutation = () => {
  const [lobvalue, setLobvalue] = useState<any>("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [sopvalue, setSopvalue] = useState<any>("");
  const [teamvalue, setTeamvalue] = useState<any>("");
  const [agentvalue, setAgentvalue] = useState<any>("");
  const [showAgentCol, setShowAgentCol] = useState<any>(false);
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [matrixType, setMatrixType] = useState<any>([]);
  const [matrixTypeValue, setMatrixTypeValue] = useState<any>([]);
  const [lob, setLob] = useState<any>([]);
  const [sop, setSop] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [agent, setAgent] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any>({});
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   const genRandomKey = async () => {
  //     fetch("http://192.168.1.90:8000/api/soptypes/")
  //   };

  //   genRandomKey();
  // }, []);

  useEffect(() => {
    authFetch("http://192.168.1.3:8000/api/lob/")
      .then((res) => res.json())
      .then((res) => setLob(res.data));

    authFetch("http://192.168.1.3:8000/api/soptypes/")
      .then((res) => res.json())
      .then((res) => setSop(res.data));
  }, []);

  const handleChangelob = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    if (e?.target?.value !== "") {
      setLobvalue(e?.target?.value);
      if (sopvalue) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ SOP_id: sopvalue, LOB_id: e?.target?.value }),
        };
        authFetch("http://192.168.1.3:8000/api/showteam/", requestOptions)
          .then((res) => res.json())
          .then((res) => {
            setTeam(res.data);
            setTeamvalue("");
            setAgentvalue("");
            setAgent([]);
          });
      }
      //   const requestOptions = {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ id: e?.target?.value }),
      //   };
      // authFetch("http://192.168.1.3:8000/api/soptypes/")
      // .then((res) => res.json())
      // .then((res) => setSop(res.data));
      //   authFetch("http://192.168.1.3:8000/api/showteam/", requestOptions)
      //     .then((res) => res.json())
      //     .then((res) => {
      //       setTeam(res.data);
      //       setTeamvalue("");
      //       setAgentvalue("");
      //     });
    } else {
      setLobvalue("");
      setTeamvalue("");
      setAgentvalue("");
      setTeam([]);
      setAgent([]);
    }
  };

  const handleChangesop = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    if (e?.target?.value !== "" && lobvalue) {
      setSopvalue(e?.target?.value);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ SOP_id: e?.target?.value, LOB_id: lobvalue }),
      };
      authFetch("http://192.168.1.3:8000/api/showteam/", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setTeam(res.data);
          setTeamvalue("");
          setAgent([]);
          setAgentvalue("");
        });
    } else {
      setSopvalue("");
      setTeamvalue("");
      setAgentvalue("");
      setAgent([]);
      setTeam([]);
    }
  };

  console.log(sop);

  const handleChangeagent = (event: SelectChangeEvent) => {
    if (event?.target?.value !== "") {
      setAgentvalue(event?.target?.value);
      console.log(event);
    } else {
      setAgentvalue("");
    }
  };

  const handleChangeteam = (event: SelectChangeEvent) => {
    if (event?.target?.value !== "") {
      setTeamvalue(event?.target?.value);
      console.log(event.target.value);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event?.target?.value }),
      };
      authFetch("http://192.168.1.3:8000/api/showagent/", requestOptions)
        .then((res) => res.json())
        .then((res) => setAgent(res.data));
    } else {
      setTeamvalue("");
      setAgentvalue("");
      setAgent([]);
    }
  };

  const daterange = (e) => {
    setValue(e);
    // console.log(e);
    setShowAgentCol(false);
    var s_Date = moment(e[0]).format("YYYY-MM-DD");
    var e_Date = moment(e[1]).format("YYYY-MM-DD");
    console.log(startDate, endDate !== "Invalid date");
    if (s_Date == e_Date) {
      const dateRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: null,
          end_date: null,
          // Matrix_list: MatrixListId,
          // Agent_list: Agentlist,
          // Team_list: Teamlist,
        }),
      };
      authFetch(
        "http://192.168.1.3:8000/elastic/allfilter/",
        dateRequestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setDataSource(res.data);
        });
    } else {
      setStartDate(s_Date);
      setEndDate(e_Date);
      const dateRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: s_Date,
          end_date: e_Date,
          // Matrix_list: MatrixListId,
          // Agent_list: Agentlist,
          // Team_list: Teamlist,
        }),
      };
      authFetch(
        "http://192.168.1.3:8000/elastic/allfilter/",
        dateRequestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setDataSource(res.data);
        });
    }
    // setValue(newValue)
  };

  const matrixTypechange = (e) => {
    setMatrixTypeValue(e);
    var matrixListId: Array<string> = [];

    e.map((item) => {
      matrixListId.push(item.value);
    });
    if (matrixListId) {
      const requestTeamsOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Matrix_list: matrixListId,
          // Agent_list: Agentlist,
          // Team_list: Teamlist,
          // Lob_id: lobvalue,
          // start_date: startDate,
          // end_date: endDate,
        }),
      };
      authFetch(
        "http://192.168.1.3:8000/elastic/allfilter/",
        requestTeamsOptions
      )
        .then((res) => res.json())
        .then((res) => {
          setDataSource(res.data);
          console.log(res.data);
        });
    } else {
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={9}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <DateRangePicker
              format="yyyy-MM-dd"
              onChange={daterange}
              className={classes.dateRange}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                label="Advanced keyboard"
                value={value}
                onChange={daterange}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <Box sx={{ mx: 1 }}> From </Box>
                    <div>
                      <input
                        className={classes.dateInput}
                        ref={startProps.inputRef as React.Ref<HTMLInputElement>}
                        {...startProps.inputProps}
                        // endIcon={<CalendarTodayIcon />}
                      />
                    </div>
                    <Box sx={{ mx: 1 }}> to </Box>
                    <input
                      placeholder="select date"
                      className={classes.dateInput}
                      ref={endProps.inputRef as React.Ref<HTMLInputElement>}
                      {...endProps.inputProps}
                    />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider> */}
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={lobvalue}
                onChange={handleChangelob}
                displayEmpty
                disableUnderline={true}
                className={classes.Select}
                inputProps={{
                  "aria-label": "Without label",
                }}
              >
                <MenuItem className={classes.MenuItem} value="">
                  Select LOB
                </MenuItem>
                {lob &&
                  lob.map((item, index) => (
                    <MenuItem
                      className={classes.MenuItem}
                      key={item.id}
                      value={item.id}
                    >
                      {item.Lob_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {" "}
            <Box sx={{ width: "130px" }}>
              <MultiSelect
                options={team}
                onChange={handleChangeteam}
                value={teamvalue}
                className={classes.Select}
                labelledBy="team"
                overrideStrings={{
                  allItemsAreSelected: "All items are selected.",
                  clearSearch: "Clear Search",
                  noOptions: "No options",
                  search: "Search",
                  selectAll: "Select All",
                  selectAllFiltered: "Select All (Filtered)",
                  selectSomeItems: "Select Team",
                }}
              />
            </Box>
          </Grid>
          <Grid item>
            {" "}
            <Box sx={{ width: "130px" }}>
              <MultiSelect
                options={agent}
                className={classes.Select}
                onChange={handleChangeagent}
                value={agentvalue}
                labelledBy="agent"
                overrideStrings={{
                  selectSomeItems: "Select Agent",
                }}
              />
            </Box>
          </Grid>
          {/* <Grid item>
            {" "}
            <Box>
              <MultiSelect
                options={matrixType}
                className={classes.Select}
                onChange={matrixTypechange}
                value={matrixTypeValue}
                labelledBy="matrix type"
                overrideStrings={{
                  selectSomeItems: "Select Matrix Type",
                }}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Grid>
      <Grid item lg={3}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="outlined" endIcon={<DownloadIcon />}>
            Download Report
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        <Grid container spacing={2} sx={{ marginBottom: "32px" }}>
          <Grid item xs={12}>
            <StatusBanner />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "12px" }}
        >
          <Typography variant="h4">Call Opening</Typography>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={10} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={20} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={80} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "12px" }}
        >
          <Typography variant="h4">Customer Verification</Typography>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={10} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={20} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={80} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "12px" }}
        >
          <Typography variant="h4">On Hold</Typography>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={10} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={20} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={80} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
          <Grid item lg={4} xl={3}>
            <CircularProgressWithLabel value={90} />
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <QualificationCard />
          </Grid>
          <Grid item xs={6}>
            <QualificationCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

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

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export const StatusBanner = () => {
  const classes = useStyles();
  return (
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
  );
};

function QualificationCard() {
  return (
    <Card sx={{ boxShadow: 0, border: "1px solid rgba(0, 0, 0, 0.12)" }}>
      <CardHeader title="Good At" sx={{ backgroundColor: "#EEEEEE" }} />
      <CardContent>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: "flex" }}
        >
          <Grid item xs={4}>
            <ul>
              <li>Call Opning</li>
              <li>On Hold</li>
              <li>On hold ( Acks )</li>
              <li>Call Closures</li>
            </ul>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid
            item
            xs={4}
            sx={{ display: "flex" }}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                width: "128px",
                height: "128px",
              }}
            >
              <CircularProgressbar value={70} text={`${70}%`} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Salutation;

const useStyles = makeStyles((theme) =>
  createStyles({
    noBorder: {
      border: "none",
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
    dateInput: {
      backgroundColor: "#ECEFF1",
      border: "none",
      borderRadius: "5px",
      padding: "10px",
      fontSize: "14px",
      fontWeight: "normal",
      width: "125px",
      lineHeight: "20px",
      fontFamily: "Roboto",
      color: "#212121",
      height: "40px",
    },
    card: {
      boxShadow: "none",
      backgroundColor: "#E6F1F9",
      borderLeft: "5px solid #66A9D9",
      borderRadius: "0px",
      // "& .MuiPaper-root-MuiCard-root": {
      //   boxShadow: "0px",
      // },
    },
    MenuItem: {
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
    },
    dateRange: {
      "& .rs-picker-toggle.rs-btn.rs-btn-default": {
        backgroundColor: "#ECEFF1",
      },
      "& span.rs-picker-toggle-placeholder": {
        color: "#212121",
      },
      "& svg.rs-picker-toggle-caret.rs-icon": {
        color: "#212121",
      },
    },
    Select: {
      backgroundColor: "#ECEFF1",
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      "& .dropdown-container": {
        "& .gray": {
          color: "#212121",
        },
        fontFamily: "Roboto",
        fontStyle: "normal",
        color: "#212121",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        backgroundColor: "#ECEFF1 !important",
        border: "0px solid !important",
        borderRadius: "4px !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "0px",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  })
);
