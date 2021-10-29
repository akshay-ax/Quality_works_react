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

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { createStyles, makeStyles } from "@mui/styles";
import { authFetch } from "../provider/AuthProvider";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useSelector } from "react-redux";
import AnalayticService from "../Services/Analatics/Agents.service";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Salutation = () => {
  const storeData = useSelector((state: any) => state?.FilterReducer?.data);
  console.log("storedata", storeData);
  const instance = <DateRangePicker />;
  const classes = useStyles();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [showAgentCol, setShowAgentCol] = useState<any>(false);
  const [showcol, setShowcol] = useState<any>(false);
  const [lobvalue, setLobvalue] = useState<any>([]);
  const [Teamlist, setTeamlist] = useState<any>();
  const [Agentlist, setAgentlist] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const [sopvalue, setSopvalue] = useState<any>([]);
  const [matrixType, setMatrixType] = useState<any>([]);
  const [MatrixListId, setMatrixListId] = useState<any>([]);
  const [matrixTypeValue, setMatrixTypeValue] = useState<any>([]);
  const [teamvalue, setTeamvalue] = useState<any>([]);
  const [agentvalue, setAgentvalue] = useState<any>([]);
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [lob, setLob] = useState<any>([]);
  const [sop, setSop] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [agent, setAgent] = useState<any[]>([]);
  const [dataSource, setDataSource] = useState<any>({});
  const [SalutationData, setSalutationData] = useState<any>({});
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
    console.log(storeData);
    AnalayticService.getAllLob().then((res) => setLob(res.data));
    AnalayticService.SalutationData(
      storeData?.LOB_id,
      storeData?.Team_id,
      storeData?.Agent_id
    ).then((res) => {
      setSalutationData(res.data);
      console.log(res.data);
    });
  }, [storeData]);

  const handleChangelob = (e: SelectChangeEvent) => {
    console.log(e);
    setLobvalue(e);
    console.log(e.target.value);
    if (e?.target?.value !== "") {
      setLobvalue(e?.target?.value);

      AnalayticService.teamDataShow(e.target.value).then((res) => {
        setTeam(res.data as Array<any>);
        setTeamvalue([]);
        setAgentvalue([]);
        setAgent([]);
        setShowAgentCol(false);
      });
    } else {
      setLobvalue([]);
      setTeamvalue([]);
      setAgentvalue([]);
      setTeam([]);
      setShowAgentCol(false);
      setAgent([]);
    }

    if (startDate && endDate !== "Invalid date" && e?.target?.value !== "") {
      const lobId = e.target.value;
      // dispatch(fetchAnalaticsdataOnLob(startDate, endDate, lobId));
      const dateRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: startDate,
          end_date: endDate,
          Lob_id: e.target.value,
        }),
      };

      AnalayticService.getAllFilterOnLob(
        startDate,
        endDate,
        e.target.value
      ).then((res) => {
        setDataSource(res.data);
        setShowAgentCol(false);
      });
    }
    if (!startDate && !endDate && e?.target?.value !== "") {
      const lobId = e.target.value;
      // dispatch(fetchAnalaticsdataOnLob(startDate, endDate, lobId));
      // setStartDate(moment(new Date()).format("YYYY-MM-DD"));
      // setEndDate(moment(new Date()).subtract(6, "months").format("YYYY-MM-DD"));
      // console.log(startDate);
      // console.log(endDate);
      const dateRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // start_date: startDate,
          // end_date: endDate,
          Lob_id: e.target.value,
        }),
      };
      AnalayticService.getAllFilterOnLob(e.target.value).then((res) => {
        setShowAgentCol(false);
        setDataSource(res.data);
      });
    }
  };

  const handleChangeagent = (event) => {
    setAgentvalue(event);
    let agentsId: Array<string> = [];

    event.map((item) => {
      agentsId.push(item.value);
    });
    console.log(typeof agentsId);
    if (agentsId) {
      setAgentlist(agentsId);
      console.log(event);
      const requestTeamsOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Matrix_list: MatrixListId,
          Agent_list: agentsId,
          Team_list: Teamlist,
          Lob_id: lobvalue,
          start_date: startDate,
          end_date: endDate,
        }),
      };

      AnalayticService.getAllFilterOnAgent(
        MatrixListId,
        agentsId,
        Teamlist,
        lobvalue,
        startDate,
        endDate
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          // setDataSource([]);
          setShowAgentCol(true);
          setDataSource(res.data);
          // grid.dataSource.unshift(res.data);
        });
    } else {
      setAgentvalue([]);
    }
  };

  console.log("dataSource :::", dataSource);

  const handleChangeteam = (event) => {
    setTeamvalue(event);
    var teamsId: Array<string> = [];

    event.map((item) => {
      teamsId.push(item.value);
    });
    setTeamlist(teamsId);
    console.log(typeof teamsId);
    if (teamsId) {
      // dispatch(
      //   fetchAnalaticsdataOnTeam(
      //     startDate,
      //     endDate,
      //     MatrixListId,
      //     teamsId,
      //     Agentlist,
      //     lobvalue
      //   )
      // );
      const requestTeamsOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Matrix_list: MatrixListId,
          Agent_list: Agentlist,
          Team_list: teamsId,
          Lob_id: lobvalue,
          start_date: startDate,
          end_date: endDate,
        }),
      };

      AnalayticService.getAllFilterOnTeam(
        MatrixListId,
        Agentlist,
        teamsId,
        lobvalue,
        startDate,
        endDate
      ).then((res) => {
        console.log(res.data);
        setDataSource(res.data);
      });
      // const requestAgentsOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: teamsId }),
      // };
      AnalayticService.agentDataShow(teamsId).then((res) => {
        // let agentlist: Array<object> = [];
        // // res.data.forEach((item) => {
        // //   agentlist.push({ label: item.Agent_name, value: item.Agent_id });
        // // });
        setAgentvalue([]);
        setAgent([]);
        setShowAgentCol(false);
        setAgent(res.data);
      });
    } else {
      setTeamvalue([]);
      setAgentvalue([]);
      setAgent([]);
      setShowAgentCol(false);
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
      // const dateRequestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     start_date: null,
      //     end_date: null,
      //     Matrix_list: MatrixListId,
      //     Agent_list: Agentlist,
      //     Team_list: Teamlist,
      //   }),
      // };

      AnalayticService.getAllFilterOnDateRange(
        MatrixListId,
        Agentlist,
        Teamlist
      ).then((res) => {
        setDataSource(res.data);
      });
    } else {
      setStartDate(s_Date);
      setEndDate(e_Date);
      AnalayticService.getAllFilterOnDateRange(
        MatrixListId,
        Agentlist,
        Teamlist,
        s_Date,
        e_Date
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
      console.log(matrixListId);
      // dispatch(
      //   fetchAnalaticsdataOnMatrixtype(
      //     startDate,
      //     endDate,
      //     matrixListId,
      //     Agentlist,
      //     Teamlist,
      //     lobvalue
      //   )
      // );
      setMatrixListId(matrixListId);
      // const requestTeamsOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     Lob_id: lobvalue,
      //     Matrix_list: matrixListId,
      //     Agent_list: Agentlist,
      //     Team_list: Teamlist,
      //     start_date: startDate,
      //     end_date: endDate,
      //   }),
      // };

      AnalayticService.getAllFilterOnMatrixType(
        lobvalue,
        matrixListId,
        Agentlist,
        Teamlist,
        startDate,
        endDate
      ).then((res) => {
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
              placeholder="Select Date"
              onChange={daterange}
              className={classes.dateRange}
            />
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={lobvalue}
                onChange={handleChangelob}
                sx={{ width: "148.77px" }}
                displayEmpty
                IconComponent={(_props) => (
                  <KeyboardArrowDownIcon sx={{ mr: 1 }} />
                )}
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
            <Box sx={{ width: "148px" }}>
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
            <Box sx={{ width: "148px" }}>
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
          <Grid item>
            {" "}
            <Box sx={{ width: "148px" }}>
              <MultiSelect
                options={matrixType}
                className={classes.Select}
                onChange={matrixTypechange}
                value={matrixTypeValue}
                labelledBy="matrix type"
                overrideStrings={{
                  selectSomeItems: "Select Matrix",
                }}
              />
            </Box>
          </Grid>
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
      <Grid item lg={12} xl={12}>
        <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        <Grid container sx={{ marginBottom: "32px" }}>
          <Grid item lg={12} xl={12}>
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
            startIcon={<AddIcon sx={{ color: "#0070C0" }} />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {SalutationData?.Call_Opening?.map((item) => {
            return (
              <Grid item lg={4} xl={4}>
                <CircularProgressWithLabel value={item} />
              </Grid>
            );
          })}

          {/* <Grid item lg={4} xl={3}>
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
          </Grid> */}
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
            startIcon={<AddIcon sx={{ color: "#0070C0" }} />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {SalutationData?.customer_authentication?.map((item) => {
            return (
              <Grid item lg={4} xl={4}>
                <CircularProgressWithLabel value={item} />
              </Grid>
            );
          })}
          {/* <Grid item lg={4} xl={3}>
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
          </Grid> */}
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
            startIcon={<AddIcon sx={{ color: "#0070C0" }} />}
          >
            Add Salutation
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {SalutationData?.on_hold?.map((item) => {
            return (
              <Grid item lg={4} xl={4}>
                <CircularProgressWithLabel value={item} />
              </Grid>
            );
          })}
          {/* <Grid item lg={4} xl={3}>
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
          </Grid> */}
        </Grid>
        {/* <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} /> */}
        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <QualificationCard />
          </Grid>
          <Grid item xs={6}>
            <QualificationCard />
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

function CircularProgressWithLabel(props) {
  console.log(props);
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
      "&:hover": {
        background: "#E6F1F9",
      },
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
        width: "148px",
        padding: "10px",
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
      borderRadius: "4px",
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
        border: "0px",
      },
    },
  })
);
