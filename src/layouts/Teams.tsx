import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import {
  ColumnDirective,
  ColumnMenu,
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
import TeamsService from "../Services/TeamManagement.tsx/Team.service";
import AnalayticService from "../Services/Analatics/Agents.service";

type LobInputs = {
  Teamname: string;
  No_Agent: string;
  Location: string;
  select: "";
  multiselect: any;
};

const defaultValues = {
  select: "",
  Teamname: "",
  No_Agent: "",
  Location: "",
  multiselect: "",
};

function Teams() {
  const classes = useStyles();
  const [openTeam, setOpenTeam] = useState<boolean>(false);
  const [teamdataSource, setTeamDataSource] = useState<any>({});
  const [selectId, setSelectId] = useState<any>();
  const [repotinManagerData, setRepotinManagerData] = useState<any>();
  const [repotinManagerValue, setRepotinManagerValue] = useState<any>();
  const [lobvalue, setLobvalue] = useState<any>([]);
  const [lob, setLob] = useState<any>([]);
  const [loblist, setLoblist] = useState<any>([]);

  useEffect(() => {
    TeamsService.getTeams().then((res) => {
      setTeamDataSource(res.data);
      console.log(res.data);
    });
    AnalayticService.getAllLob().then((res) => setLob(res.data));
    TeamsService.getReportingManager().then((res) => {
      setRepotinManagerData(res.data);
      console.log(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({ defaultValues });
  const onSubmit: SubmitHandler<LobInputs> = (data) => {
    console.log(data);
    console.log(loblist);
    console.log(repotinManagerValue);
    // var manager: Array<string> = [];
    // manager.push(data.select);
    if (selectId) {
      TeamsService.EditTeam(
        selectId,
        data.select,
        loblist,
        data.Location,
        data.No_Agent,
        data.Teamname
      ).then(() => {
        TeamsService.getTeams().then((res) => {
          setSelectId("");
          setTeamDataSource(res.data);
        });
      });
    } else {
      TeamsService.addteam(
        data.Teamname,
        data.No_Agent,
        data.Location,
        loblist,
        data.select
      ).then(() => {
        TeamsService.getTeams().then((res) => setTeamDataSource(res.data));
      });
    }
    // console.log(data);
    handleClose();
  };

  const addNewLobHandle = (e) => {
    setSelectId("");
    setLoblist([]);
    setLobvalue([]);
    reset();
    setOpenTeam(true);
  };

  const handleRefresh = () => {};

  const handleClose = () => {
    // setAnchorEl(null);
    setOpenTeam(false);
  };

  const handleEdit = (item) => {
    var lobId: Array<string> = [];
    setSelectId(item.id);
    // setLobvalue{}
    item.LOB.map((item) => {
      lobId.push(item);
    });
    setLobvalue(lobId);
    setValue("Teamname", item.Team_name);
    setValue("No_Agent", item.No_agentns);
    setValue("Location", item.Locations);
    setValue("select", item.Reporting_manager.id);
    setOpenTeam(true);
    console.log(item);
  };

  const handleDelete = (item) => {
    console.log(item);
    TeamsService.deleteTeam(item.id).then((res) =>
      TeamsService.getTeams().then((res) => setTeamDataSource(res.data))
    );
    console.log(item);
  };

  const lobs = (props: any) => {
    // console.log(props);
    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      // if (!item.enabled) e.preventDefault();
      console.log(e);
    };
    // console.log(props);

    return (
      <>
        {props.LOB?.map((item) => (
          <div>{item.Lob_name}</div>
        ))}
        {/* {props.LOB[0]?.Lob_name},{props.LOB[1]?.Lob_name},
        {props.LOB[2]?.Lob_name},{props.LOB[3]?.Lob_name} */}
        {/* </NavLink> */}
      </>
    );
  };

  const view = (props: any) => {
    // console.log(props);
    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      // if (!item.enabled) e.preventDefault();
      console.log(e);
    };
    // console.log(props);

    return (
      <>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleEdit(props);
          }}
          sx={{ border: "0px", color: "#0070C0" }}
        >
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleDelete(props);
          }}
          sx={{ border: "0px", color: "#0070C0" }}
        >
          Delete
        </Button>
        {/* </NavLink> */}
      </>
    );
  };
  const handleChangelob = (e) => {
    var lobId: Array<string> = [];
    e.map((item) => {
      lobId.push(item.value);
    });
    setLoblist(lobId);
    setLobvalue(e);
    console.log(e);
  };

  const handleChangeRMdata = (e: SelectChangeEvent) => {
    setRepotinManagerValue(e?.target?.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, pt: "8px", pl: "24px" }}
            >
              Teams
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              variant="outlined"
              className={classes.button}
              onClick={addNewLobHandle}
              startIcon={<AddIcon sx={{ color: "#0070C0" }} />}
            >
              Add Team
            </Button>
            <Dialog
              classes={{ paper: classes.paper }}
              open={openTeam}
              onClose={handleClose}
            >
              <DialogTitle>
                {" "}
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                        {selectId ? "Edit Team" : "Add Team"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="flex-start"
                    ></Grid>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent sx={{ pb: "0px" }}>
                <FormControl
                  sx={{ mb: "15px" }}
                  className={classes.fillWidth}
                  variant="filled"
                >
                  <FilledInput
                    type="text"
                    multiline
                    className={classes.fieldInput}
                    placeholder="Enter teamname"
                    {...register("Teamname")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <FormControl
                  sx={{ mb: "15px" }}
                  className={classes.fillWidth}
                  variant="filled"
                >
                  <FilledInput
                    type="text"
                    multiline
                    className={classes.fieldInput}
                    placeholder="Enter no of agent "
                    {...register("No_Agent")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <FormControl
                  sx={{ mb: "15px" }}
                  className={classes.fillWidth}
                  variant="filled"
                >
                  <FilledInput
                    type="text"
                    multiline
                    className={classes.fieldInput}
                    placeholder="Enter no of location"
                    {...register("Location")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <Grid item>
                  <FormControl
                    sx={{ mb: "15px" }}
                    // className={classes.fillWidth}
                    fullWidth
                    // variant="filled"
                  >
                    <Controller
                      render={({ field }) => (
                        <Select
                          {...field}
                          sx={{ width: "148.77px" }}
                          displayEmpty
                          disableUnderline={true}
                          className={classes.Select}
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                        >
                          <MenuItem className={classes.MenuItem} value="">
                            Select Manager
                          </MenuItem>
                          {repotinManagerData &&
                            repotinManagerData.map((item, index) => (
                              <MenuItem
                                className={classes.MenuItem}
                                key={item.id}
                                value={item.id}
                              >
                                {item.Manager_name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                      control={control}
                      name="select"
                    />
                    {/* <Select
                    value={repotinManagerValue}
                    onChange={handleChangeRMdata}
                    displayEmpty
                    // IconComponent={(_props) => (
                    //   <KeyboardArrowDownIcon sx={{ mr: 1 }} />
                    // )}
                    disableUnderline={true}
                    className={classes.Select}
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                  >
                    <MenuItem className={classes.MenuItem} value="">
                      Select Manager
                    </MenuItem>
                    {repotinManagerData &&
                      repotinManagerData.map((item, index) => (
                        <MenuItem
                          className={classes.MenuItem}
                          key={item.id}
                          value={item.id}
                        >
                          {item.Manager_name}
                        </MenuItem>
                      ))}
                  </Select> */}
                  </FormControl>
                </Grid>
                <Controller
                  render={({ field }) => (
                    <MultiSelect
                      {...field}
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
                    />
                  )}
                  control={control}
                  name="multiselect"
                />
              </DialogContent>
              <DialogActions sx={{ pr: "24px", mb: "24px" }}>
                <Button
                  variant="outlined"
                  onClick={handleSubmit(onSubmit)}
                  className={classes.button}
                >
                  save
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  className={classes.button}
                >
                  cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Grid item>
          <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
          <GridComponent
            dataSource={teamdataSource}
            allowPaging={true}
            className={classes.th}
            dataSourceChanged={handleRefresh}
            allowSorting={true}
          >
            <ColumnsDirective>
              <ColumnDirective field="Team_name" headerText="Team Name" />
              <ColumnDirective field="LOB" headerText="LOBs" template={lobs} />
              <ColumnDirective field="Locations" headerText="Location" />
              <ColumnDirective field="No_agentns" headerText="No Agents" />
              <ColumnDirective
                field="Reporting_manager.Manager_name"
                headerText="Manager name"
              />
              <ColumnDirective
                field="action"
                headerText="Action"
                textAlign="Center"
                template={view}
              />
            </ColumnsDirective>
            <Inject services={[Sort, ColumnMenu, Filter, Page, Group, Edit]} />
          </GridComponent>

          <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Teams;

const useStyles = makeStyles((theme) =>
  createStyles({
    fieldInput: {
      padding: "8px 12px 8px",
      fontSize: "16px",
    },
    paper: { minWidth: "822px" },
    boxShadow: {
      boxShadow: "2px 4px 8px rgba(33, 33, 33, 0.1)",
    },
    noBorder: {
      border: "none",
    },
    Select: {
      width: "100%",
      backgroundColor: "#ECEFF1",
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      borderRadius: "4px",
      "& .MuiFilledInput-input": {
        paddingTop: "12px",
      },
      // "& .MuiFormLabel-root .MuiInputLabel-root": {
      //   top: "-7px",
      // },
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
    MenuItem: {
      color: "#212121",
      height: "40px",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
    },
    fillWidth: {
      width: "-webkit-fill-available",
      borderRadius: "4px",
      border: "1px solid #E0E0E0",
    },
    menu: {
      "& .MuiPopover-paper": {
        boxShadow: "2px 4px 8px rgba(33, 33, 33, 0.1)",
      },
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
        border: "1px solid #338DCD",
        background: "#E6F1F9",
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
