import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  alpha,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Badge,
  Grid,
  ImageList,
  InputBase,
  SvgIcon,
  SvgIconProps,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { AccountCircle } from "@mui/icons-material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { createStyles, makeStyles } from "@mui/styles";
import AppMenuItem from "./AppMenu";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import SyncIcon from "@mui/icons-material/Sync";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../asserts/images/LOGOhghgh.svg";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Salutation from "./Salutation";
import { height, width } from "@mui/system";
import { NavLink, Route } from "react-router-dom";
import { useHistory } from "react-router";
import routes from "../Routes";
import Analytics from "./Analytics";
import SoftSkills from "./SoftSkills";
import Dashboard from "./Dashboard";
import { ComponentType, FC } from "react";
import vector from "../../src/asserts/images/Vector.svg";

const drawerWidth = 240;

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 1200, // Tablet/Laptop
    lg: 1400, // Desktop
    xl: 1500,
  },
};

interface RouteItem {
  key: String;
  title: String;
  tooltip?: String;
  path?: String;
  component?: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<RouteItem>;
  appendDivider?: boolean;
}

const data = [
  { label: "Quality", icon: <TextSnippetIcon /> },
  { label: "Text", icon: <TextSnippetIcon /> },
  { label: "Speech", icon: <TextSnippetIcon /> },
  { label: "Pradictive", icon: <TextSnippetIcon /> },
];

const openedMixin = (theme: Theme): CSSObject => ({
  top: "67px",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  top: "67px",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#BDBDBD", 0.15),
  "&:hover": {
    backgroundColor: alpha("#BDBDBD", 0.25),
  },
  width: "100%",
  color: "black",
  [theme.breakpoints.up("lg")]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: "1.525rem",
    [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "1.5rem",
    },
    [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
      fontSize: "1.25rem",
    },
  },
  padding: theme.spacing(0, 44),
  color: "rgba(0, 0, 0, 0.38)",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: "0.875rem",
    },
    [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
      fontSize: "0.75rem",
    },
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(2px + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("lg")]: {
      width: "350px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "375px",
    },
    [theme.breakpoints.up("md")]: {
      width: "375px",
    },
  },
}));

function TeamManagementIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 8V0H13V3H7V0H0V8H7V5H9V15H13V18H20V10H13V13H11V5H13V8H20ZM5 6H2V2H5V6ZM15 12H18V16H15V12ZM15 2H18V6H15V2Z" />
    </SvgIcon>
  );
}

const DefaultLayout = ({ children, ...rest }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenusub, setopenMenusub] = React.useState(false);
  const menuId = "primary-search-account-menu";

  const handleDrawerState = () => {
    setOpen(!open);
  };

  const redirectTodashboard = () => {
    history.push("/dashboard");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const appMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      Icon: DashboardIcon,
      depth: 1,
    },
    {
      title: "Analytics",
      path: "/analytic",
      Icon: InsertChartIcon,
      depth: 1,
      items: [
        {
          title: "Agent",
          path: "/analytic/agent",
          Icon: SupportAgentIcon,
          depth: 3,
          items: [
            {
              title: "CSAT",
              path: "/analytic/agent/csat",
              depth: 3.5,
            },
            {
              depth: 3.5,
              title: "Salutation",
              path: "/analytic/agent/salutation",
            },
            {
              depth: 3.5,
              title: "Soft Skills",
              path: "/analytic/agent/softSkills",
            },
            {
              depth: 3.5,
              title: "Progress Knowledge",
              path: "/analytic/agent/processknowledge",
            },
            {
              depth: 3.5,
              title: "Call Closer",
              path: "/analytic/agent/callclosure",
            },
            {
              depth: 3.5,
              title: "Voice",
              path: "/analytic/agent/voice",
            },
            {
              depth: 3.5,
              title: "Sentiment",
              path: "/analytic/agent/sentiment",
            },
          ],
        },
        {
          depth: 3,
          title: "Customer",
          path: "/analytic/customer",
          Icon: AccountCircleIcon,
          items: [
            {
              depth: 3.5,
              title: "Sentiment",
              path: "/analytic/customer/sentiment",
            },
            {
              depth: 3.5,
              title: "TalkTime",
              path: "/analytic/customer/talkTime",
            },
            {
              depth: 3.5,
              title: "Keywords",
              path: "/analytic/customer/keywords",
            },
          ],
        },
      ],
    },
    {
      title: "Evaluation",
      path: "/evaluation",
      Icon: VisibilityIcon,
      depth: 1,
      // items: [
      //   {
      //     title: "Quality",
      //     path: "/quality",
      //     Icon: SyncIcon,
      //     depth: 3,
      //   },
      // ],
    },
    {
      title: "SOP Configuration",
      path: "/sopconfiguration",
      Icon: AutorenewIcon,
      depth: 1,
      // items: [
      //   {
      //     title: "Quality",
      //     path: "/quality",
      //     Icon: SyncIcon,
      //     depth: 3,
      //   },
      // ],
    },
    {
      title: "Team Management",
      path: "/teammanagement",
      Icon: TeamManagementIcon,
      depth: 1,
      items: [
        {
          title: "Workspace",
          path: "/teammanagement/workspace",

          depth: 3.5,
        },
        {
          title: "Location",
          path: "/teammanagement/location",

          depth: 3.5,
        },
        {
          title: "Lobs",
          path: "/teammanagement/lobs",

          depth: 3.5,
        },
        {
          title: "Teams",
          path: "/teammanagement/teams",

          depth: 3.5,
        },
      ],
    },
    {
      title: "Reports",
      path: "/reports",
      Icon: DashboardIcon,
      depth: 1,
      // items: [
      //   {
      //     title: "Quality",
      //     path: "/quality",
      //     Icon: SyncIcon,
      //     depth: 3,
      //   },
      // ],
    },
    {
      title: "Setting",
      Icon: SettingsIcon,
      path: "/setting",
      depth: 1,
      // items: [
      //   {
      //     title: "Quality",
      //     Icon: SyncIcon,
      //     path: "/quality",
      //     depth: 3,
      //   },
      // ],
    },
  ];

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    // if (!item.enabled) e.preventDefault();
    console.log(e);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: "#fff", maxHeight: "64px" }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerState}
            edge="start"
            sx={{
              marginRight: "12px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ pt: "10px" }} noWrap component="div">
            <ImageList>
              <img
                src={Logo}
                alt="header logo"
                loading="lazy"
                onClick={redirectTodashboard}
              />
            </ImageList>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box mt="5px" mr="50px">
              <Search sx={{ background: "#ECEFF1" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for an agent or matric"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
            <IconButton
              className={classes.iconbutton}
              aria-label="show 17 new notifications"
            >
              <Badge color="error">
                <NotificationsIcon sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
              </Badge>
            </IconButton>
            <Divider
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              className={classes.iconbutton}
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle sx={{ color: "rgba(0, 0, 0, 0.6)" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ height: "calc(100% - 64px)", top: 64 }}
        transitionDuration={{ enter: 5000, exit: 5000 }}
      >
        {open ? (
          <List component="nav" className={classes.appMenu} disablePadding>
            {appMenuItems.map((item, index) => (
              <NavLink to={`${item.path}`} onClick={handleNavigate}>
                <AppMenuItem
                  {...item}
                  key={index}
                  depth={item.depth}
                  path={item.path}
                />
              </NavLink>
            ))}
          </List>
        ) : (
          <List component="nav" className={classes.appMenu} disablePadding>
            {appMenuItems.map((item, index) => (
              <NavLink to={`${item.path}`} onClick={handleNavigate}>
                <AppMenuItem {...item} key={index} path={item.path} depth={2} />
              </NavLink>
            ))}
          </List>
        )}
      </Drawer>
      <Box
        component="main"
        sx={{ backgroundColor: "#E5E5E5", width: "100%", overflow: "hidden" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            m: 2,
            mt: 12,
            backgroundColor: "#ffffff",
          }}
        >
          {routes.map((route: RouteItem) =>
            route.subRoutes ? (
              route.subRoutes.map((item: any) => (
                <Route
                  key={`${item.key}`}
                  path={`${item.path}`}
                  component={item.component || Dashboard}
                  exact
                />
              ))
            ) : (
              <Route
                key={`${route.key}`}
                path={`${route.path}`}
                component={route.component || Dashboard}
                exact
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <DefaultLayout>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};

export default DefaultLayout;
const useStyles = makeStyles((theme) =>
  createStyles({
    iconbutton: {
      "& .MuiSvgIcon-root": {
        fontSize: "1.725rem",
        [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
          fontSize: "1.5rem",
        },
        [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
          fontSize: "1.25rem",
        },
      },
    },
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      backgroundColor: "#ffffff",
      width: drawerWidth,
    },
    menuItemIcon: {
      color: "#97c05c",
    },
  })
);
