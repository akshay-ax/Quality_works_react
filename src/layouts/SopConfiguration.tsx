import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SopConfigurationService from "../Services/SopConfiguration/Sopconfiguration";
import { SubmitHandler, useForm } from "react-hook-form";

function SopConfiguration() {
  const data1 = [
    { name: "Thanks for Calling “ABC” How can I help you today?" },
    { name: "Thanks for Calling “ABC” How can I help you today?" },
    { name: "Thanks for Calling “ABC” How can I help you today?" },
  ];
  const classes = useStyles();
  const lob = ["Call Opening", "Customer Verification", "On Hold"];

  const [auth, setAuth] = useState<any>(true);
  const [sopId, setSopId] = useState<any>();
  const [subSopName, setSubSopName] = useState<any>();
  const [subsopId, setSubSopId] = useState<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [opensop, setOpensop] = useState<boolean>(false);
  const [SobConfigData, setSobConfigData] = useState<any>();

  type SopInputs = {
    textarea: string;
    soptype: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SopInputs>();

  const onSubmit: SubmitHandler<SopInputs> = (data) => {
    const title = data.textarea;
    const sopName = data.soptype;
    console.log(data);
    console.log(sopId);
    if (sopName) {
      SopConfigurationService.addSopType(sopName).then(() => {
        setSubSopId("");
        setSubSopName("");
        SopConfigurationService.getSopConfigData().then((res) =>
          setSobConfigData(res.data)
        );
      });
    }
    if (subsopId) {
      SopConfigurationService.EditSubSop(subsopId, sopId, title).then(() => {
        setSubSopId("");
        setSubSopName("");
        SopConfigurationService.getSopConfigData().then((res) =>
          setSobConfigData(res.data)
        );
      });
    } else {
      SopConfigurationService.addSubSop(sopId, title).then(() =>
        SopConfigurationService.getSopConfigData().then((res) =>
          setSobConfigData(res.data)
        )
      );
      console.log(data);
    }

    handleClose();
  };

  useEffect(() => {
    SopConfigurationService.getSopConfigData().then((res) =>
      setSobConfigData(res.data)
    );
  }, []);

  const addNewSopHandle = (e) => {
    reset();
    setSopId(e.id);
    setOpensop(true);
  };

  console.log(SobConfigData);
  const handleClickOpen = (e) => {
    setSubSopId("");
    reset();
    // setSopId(e.id);
    setOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>, item, sopid) => {
    reset();
    setSubSopId(item.id);
    setSopId(sopid);
    setValue("textarea", item.Sop_sub_type);
    setSubSopName(item.Sop_sub_type);
    console.log(item.Sop_sub_type);
    console.log(event);
    console.log(item.id);
    setAnchorEl(event.currentTarget);
    // console.log(event.currentTarget);
  };

  const handleEdit = (item) => {
    setAnchorEl(null);
    setOpen(true);
    console.log(watch("textarea"));
    console.log(register("textarea"));
    // SopConfigurationService.EditSubSop(item, sopId, subSopName).then(() => {
    //   SopConfigurationService.getSopConfigData().then((res) =>
    //     setSobConfigData(res.data)
    //   );
    // });
    console.log(item);
  };

  const handleDelete = (item) => {
    setAnchorEl(null);
    SopConfigurationService.deleteSubSop(item).then(() => {
      SopConfigurationService.getSopConfigData().then((res) =>
        setSobConfigData(res.data)
      );
    });
    console.log(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setOpensop(false);
  };
  const handleChangelob = () => {};

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
              SALUTATION
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
              onClick={addNewSopHandle}
              startIcon={<AddIcon sx={{ color: "#0070C0" }} />}
            >
              Add New Soptype
            </Button>
            <Dialog
              classes={{ paper: classes.paper }}
              open={opensop}
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
                        Add Sop
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
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}
                <FormControl className={classes.fillWidth} variant="filled">
                  <FilledInput
                    type="text"
                    multiline
                    placeholder="Enter text here..."
                    rows={2}
                    {...register("soptype")}
                    id="soptype"
                    disableUnderline={true}
                  />
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
            <Dialog
              classes={{ paper: classes.paper }}
              open={open}
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
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "normal", mt: 3 }}
                      >
                        {subsopId ? "Edit Greetings" : "Add Greetings"}
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
                {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}
                <FormControl className={classes.fillWidth} variant="filled">
                  <FilledInput
                    type="textarea"
                    multiline
                    placeholder="Enter text here..."
                    rows={5}
                    {...register("textarea")}
                    id="textarea"
                    disableUnderline={true}
                  />
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
      </Grid>
      {SobConfigData?.map((items, index) => (
        <div>
          <Divider sx={{ marginTop: "16px", marginBottom: "32px" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: "12px" }}
          >
            <Typography variant="h4">{items?.Sop_name}</Typography>
          </Stack>
          <Grid container spacing={2}>
            {items.Sop_sub_types &&
              items.Sop_sub_types.map((item, index) => (
                <Grid item lg={4} xl={3}>
                  <Card
                    key={index}
                    sx={{ boxShadow: 0, backgroundColor: "#F5F5F5" }}
                  >
                    <CardContent sx={{ pb: "16px !important" }}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={8}>
                          <Typography variant="subtitle1">
                            {item.Sop_sub_type}
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
                            {auth && (
                              <div>
                                <IconButton
                                  size="large"
                                  aria-label="account of current user"
                                  aria-controls="menu-appbar"
                                  aria-haspopup="true"
                                  onClick={(e) => handleMenu(e, item, items.id)}
                                  color="inherit"
                                >
                                  <MoreVertIcon sx={{ color: "#757575" }} />
                                </IconButton>
                                <Menu
                                  id="menu-appbar"
                                  anchorEl={anchorEl}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                  }}
                                  // className={classes.menu}
                                  keepMounted
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                  }}
                                  // MenuListProps={{
                                  //   classes: { paper: classes.boxShadow },
                                  // }}
                                  PaperProps={{
                                    elevation: 0,
                                    sx: {
                                      boxShadow:
                                        "2px 2px 2px rgb(33 33 33 / 2%)",
                                      borderRadius: "4px",
                                    },
                                  }}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem
                                    sx={{ width: "172px" }}
                                    onClick={() => handleEdit(subsopId)}
                                  >
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => handleDelete(subsopId)}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            <Grid item lg={4} xl={3}>
              <Card
                sx={{
                  boxShadow: 0,
                  border: "1px solid #66A9D9",
                  backgroundColor: "#E6F1F9",
                }}
                onClick={() => handleClickOpen(items)}
              >
                <CardContent sx={{ pb: "16px !important" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: "56px" }}
                  >
                    <AddIcon sx={{ color: "#0070C0" }} />
                    {/* <Grid item xs={8}></Grid> */}
                    {/* <Grid item xs={2}>
                     <Box
                       sx={{
                         position: "relative",
                         display: "inline-flex",
                         width: "56px",
                         height: "56px",
                       }}
                     ></Box>
                   </Grid> */}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
}

export default SopConfiguration;

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
  })
);
