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
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
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
import LobsService from "../Services/TeamManagement.tsx/Lobs.service";

type LobInputs = {
  Teamname: string;
  No_Agent: number;
  Location: number;
};

function Teams() {
  const classes = useStyles();
  const [openlob, setOpenlob] = useState<boolean>(false);
  const [lobdataSource, setLobDataSource] = useState<any>({});
  const [selectId, setSelectId] = useState<any>();

  useEffect(() => {
    LobsService.getLobs().then((res) => setLobDataSource(res.data));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LobInputs>();
  const onSubmit: SubmitHandler<LobInputs> = (data) => {
    console.log(data);
    // if (selectId) {
    //   LobsService.EditLobs(data.lobname, selectId).then(() => {
    //     setSelectId("");
    //     LobsService.getLobs().then((res) => setLobDataSource(res.data));
    //   });
    // } else {
    //   LobsService.addLobs(data.lobname).then(() => {
    //     setSelectId("");
    //     LobsService.getLobs().then((res) => setLobDataSource(res.data));
    //   });
    // }
    // console.log(data);
    handleClose();
  };

  const addNewLobHandle = (e) => {
    reset();
    setOpenlob(true);
  };

  const handleRefresh = () => {};

  const handleClose = () => {
    // setAnchorEl(null);
    setOpenlob(false);
  };

  const handleEdit = (item) => {
    setSelectId(item.id);
    // setValue("lobname", item.Lob_name);
    setOpenlob(true);
    console.log(item);
  };

  const handleDelete = (item) => {
    // console.log(item)
    LobsService.deleteLobs(item.id).then((res) =>
      LobsService.getLobs().then((res) => setLobDataSource(res.data))
    );
    console.log(item);
  };

  const view = (props: any) => {
    // console.log(props);
    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ): void => {
      // if (!item.enabled) e.preventDefault();
      console.log(e);
    };
    console.log(props);

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
              open={openlob}
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
                <FormControl className={classes.fillWidth} variant="filled">
                  <FilledInput
                    type="text"
                    multiline
                    placeholder="Enter Teamname"
                    rows={2}
                    {...register("Teamname")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <FormControl className={classes.fillWidth} variant="filled">
                  <FilledInput
                    type="text"
                    multiline
                    placeholder="Enter No of Agent "
                    rows={2}
                    {...register("No_Agent")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <FormControl className={classes.fillWidth} variant="filled">
                  <FilledInput
                    type="text"
                    multiline
                    placeholder="Enter no of Location"
                    rows={2}
                    {...register("Location")}
                    id="lobname"
                    disableUnderline={true}
                  />
                </FormControl>
                <FormControl className={classes.fillWidth} variant="filled">
                  {/* <Select
                  value={lobvalue}
                  onChange={handleChangelob}
                  sx={{ width: "148.77px" }}
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
                </Select> */}
                </FormControl>
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
            dataSource={lobdataSource}
            allowPaging={true}
            className={classes.th}
            dataSourceChanged={handleRefresh}
            allowSorting={true}
          >
            <ColumnsDirective>
              <ColumnDirective field="Lob_name" headerText="LOBs" width="80%" />
              <ColumnDirective
                field="action"
                headerText="Action"
                width="20%"
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
    paper: { minWidth: "822px" },
    boxShadow: {
      boxShadow: "2px 4px 8px rgba(33, 33, 33, 0.1)",
    },
    noBorder: {
      border: "none",
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
    MenuItem: {
      width: "149px",
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
