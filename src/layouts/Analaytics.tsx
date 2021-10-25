import { DateRange, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import DownloadIcon from "@mui/icons-material/Download";
import React, { useEffect, useState } from "react";
import { authFetch } from "../provider/AuthProvider";
import { MultiSelect } from "react-multi-select-component";
import moment from "moment";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  ColumnDirective,
  ColumnMenu,
  ColumnModel,
  ColumnsDirective,
  Edit,
  Filter,
  FilterSettingsModel,
  GridComponent,
  Group,
  GroupSettingsModel,
  Inject,
  Page,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAnalaticsdata,
  fetchAnalaticsdataOnAgent,
  fetchAnalaticsdataOnLob,
  fetchAnalaticsdataOnMatrixtype,
  fetchAnalaticsdataOnTeam,
  storedata,
} from "../store/actions/actionCreators";
import { NavLink, useHistory } from "react-router-dom";
import AnalayticService from "../Services/Analatics/Agents.service";

let coloum = [
  {
    name: "CSAT",
  },
  {
    name: "Soft Skills",
  },
  {
    name: "Soft Skills",
  },
];
const Analaytics = () => {
  // const analayticData = useSelector((state: any) => state?.data);
  // console.log(analayticData);
  const history = useHistory();
  const dispatch = useDispatch();
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

  const groupOptions: GroupSettingsModel = { showGroupedColumn: true };
  const filterSettings: FilterSettingsModel = { type: "CheckBox" };

  useEffect(() => {
    // dispatch(fetchAnalaticsdata());

    AnalayticService.getAllLob().then((res) => setLob(res.data));
    AnalayticService.getAllFilter().then((res) => setDataSource(res.data));
    AnalayticService.getAllMatrixType().then((res) => setMatrixType(res.data));
  }, []);

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "😶 No Items Selected";
  };

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
      dispatch(
        fetchAnalaticsdataOnAgent(
          startDate,
          endDate,
          MatrixListId,
          agentsId,
          Teamlist,
          lobvalue
        )
      );
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
      ).then((res) => {
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
      // const requestTeamsOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     Matrix_list: MatrixListId,
      //     Agent_list: Agentlist,
      //     Team_list: teamsId,
      //     Lob_id: lobvalue,
      //     start_date: startDate,
      //     end_date: endDate,
      //   }),
      // };

      AnalayticService.getAllFilterOnTeam(
        Agentlist,
        teamsId,
        lobvalue,
        startDate,
        endDate,
        MatrixListId
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

  const handleRefresh = () => {};

  const dataBound = () => {};

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
      const dateRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: s_Date,
          end_date: e_Date,
          Matrix_list: MatrixListId,
          Agent_list: Agentlist,
          Team_list: Teamlist,
        }),
      };
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

  const view = (props: any) => {
    // console.log(props);
    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      // if (!item.enabled) e.preventDefault();
      console.log(e);
    };

    return (
      <>
        {props["CQ SCORES"]}
        {/* <NavLink to={`analaytic/agent/salutation`} onClick={handleNavigate}> */}
        <Button
          onClick={(e) => {
            e.preventDefault();
            history.push("analaytic/agent/salutation");
            dispatch(storedata(props));
            console.log("onClick", props);
          }}
          variant="outlined"
          sx={{ float: "right", border: "0px", color: "#0070C0" }}
        >
          view
        </Button>
        {/* </NavLink> */}
      </>
    );
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={10}>
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
                {/* <MultiSelect
                  options={lob}
                  onChange={handleChangelob}
                  value={lobvalue}
                  className={classes.Select}
                  labelledBy="Lob"
                  hasSelectAll={false}
                  // valueRenderer={customValueRenderer}
                  overrideStrings={{
                    allItemsAreSelected: "All items are selected.",
                    clearSearch: "Clear Search",
                    noOptions: "No options",
                    search: "Search",
                    selectAll: "Select All",
                    selectAllFiltered: "Select All (Filtered)",
                    selectSomeItems: "Select Lob",
                  }}
                /> */}
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
        <Grid item md={2}>
          <Grid container direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ height: "36px" }}
              endIcon={<DownloadIcon />}
            >
              Download Report
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
          <GridComponent
            dataSource={dataSource?.data}
            allowPaging={true}
            className={classes.th}
            dataSourceChanged={handleRefresh}
            dataBound={dataBound}
            allowSorting={true}
          >
            <ColumnsDirective>
              {dataSource?.att_array &&
                dataSource.att_array.map((item) => {
                  if (item === "CQ SCORES") {
                    return (
                      <ColumnDirective
                        field={item}
                        headerText={item}
                        width="159.5px"
                        template={view}
                      />
                    );
                  } else {
                    return (
                      <ColumnDirective
                        field={item}
                        headerText={item}
                        width="100%"
                      />
                    );
                  }
                })}
            </ColumnsDirective>
            <Inject services={[Sort, ColumnMenu, Filter, Page, Group, Edit]} />
          </GridComponent>

          <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        </Grid>
      </Grid>
    </div>
  );
};

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
      fontWeight: 500,
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
    th: {
      "& .e-pagercontainer": {
        float: "right",
      },
      "&.e-grid": {
        border: "0px",
      },
      "&.e-grid .e-gridheader": {
        border: "0px",
      },
      "&.e-grid .e-headercell": {
        fontFamily: "Roboto",
        fontSize: "16px",
        padding: "12px 12px 12px 24px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "#EEEEEE",
      },
      "&.e-grid .e-headertext": {
        color: "#212121",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0.0015em",
      },
      "&.e-grid .e-row": {
        backgroundColor: "#FAFAFA",
        border: "none",
      },
      "&.e-grid .e-altrow": {
        backgroundColor: "#f5f5f5 !important",
      },
      "&.e-grid .e-rowcell": {
        border: "none",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "20px",
      },
    },
  })
);

export default Analaytics;
