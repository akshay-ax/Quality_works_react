import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Paper from "@mui/material/Paper";
import { Link as RouterLink, NavLink } from "react-router-dom";
// React runtime PropTypes
export const AppMenuItemPropTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
  depth: PropTypes.number,
};
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, "items">;

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[];
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 1200, // Tablet/Laptop
    lg: 1400, // Desktop
    xl: 1600,
  },
};

const AppMenuItem: React.FC<AppMenuItemProps> = (props) => {
  const { title, Icon, items = [], depth, path } = props;
  const classes = useStyles();
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  const [click, setClick] = React.useState(false);
  const [opent, setOpent] = React.useState(false);
  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    console.log(e);
  };
  function handleClick() {
    setClick(!click);
    setOpen(!open);
  }

  if (depth == 2) {
    var a = (
      <ListItemButton
        sx={{
          color: "#757575",
          p: "12px",
          pt: "16px",
          pb: "16px",
          [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          ...(open && {
            boxShadow: "inset 4px 0px 0px #0070C0",
            background: "#F5F5F5",
          }),
        }}
        className={classes.menuItem}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon
            sx={{
              ml: "9px",
              ...(open && {
                color: "#0070C0",
              }),
            }}
            className={classes.menuItemIcon}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          sx={{ display: "none" }}
          primary={title}
          className={classes.listitemtext}
          inset={!Icon}
          disableTypography={true}
        />
        {isExpandable && !open && (
          <ArrowRightIcon sx={{ fontSize: "22px", display: "none" }} />
        )}
        {isExpandable && open && (
          <ArrowDropDownIcon sx={{ fontSize: "22px", display: "none" }} />
        )}
      </ListItemButton>
    );
  } else if (depth == 3) {
    var a = (
      <ListItemButton
        sx={{
          background: "rgba(236, 236, 236, 0.72)",
          color: "#757575",
          pt: "16px",
          pb: "16px",
          [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          ...(open && {
            fontWeight: "500",
            color: "#212121",
          }),
        }}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon
            sx={{ pl: "16px", minWidth: "45px" }}
            className={classes.menuItemIcon}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          className={classes.listitemtext30}
          disableTypography={true}
          sx={{ pl: "12px", mt: "6px" }}
          primary={title}
          inset={!Icon}
        />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <ArrowRightIcon sx={{ fontSize: "22px" }} />}
        {isExpandable && open && (
          <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
        )}
      </ListItemButton>
    );
  } else if (depth == 3.5) {
    var a = (
      <ListItemButton
        sx={{
          pt: "16px",
          pb: "16px",
          [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
            pt: "14px",
            pb: "14px",
          },
        }}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon
            sx={{ minWidth: "45px" }}
            className={classes.menuItemIcon}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          className={classes.listitemtext35}
          disableTypography={true}
          primary={title}
          inset={!Icon}
          sx={{ mt: "6px" }}
          // sx={{
          //   fontSize: "14px !important",
          // }}
        />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <ArrowRightIcon sx={{ fontSize: "22px" }} />}
        {isExpandable && open && (
          <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
        )}
      </ListItemButton>
    );
  } else {
    var a = (
      <ListItemButton
        sx={{
          pl: "12px",
          pt: "16px",
          pb: "16px",
          [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
            pt: "14px",
            pb: "14px",
          },
          [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
            pt: "14px",
            pb: "14px",
          },

          color: "#757575",
          ...(open && {
            boxShadow: "inset 4px 0px 0px #0070C0",
            background: "#F5F5F5",
            fontWeight: "500",
            color: "#212121",
          }),
        }}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon
            className={classes.menuItemIcon}
            sx={{
              ml: "9px",
              minWidth: "35px",
              ...(open && {
                color: "#0070C0",
              }),
            }}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          className={classes.listitemtext}
          primary={title}
          disableTypography={true}
          sx={{ mt: "0px", mb: "0px" }}
          inset={!Icon}
        />
        {isExpandable && !open && <ArrowRightIcon sx={{ fontSize: "22px" }} />}
        {isExpandable && open && (
          <ArrowDropDownIcon sx={{ fontSize: "22px" }} />
        )}
      </ListItemButton>
    );
  }

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <NavLink
            to={`${item.path}`}
            className={classes.active}
            onClick={handleNavigate}
          >
            <AppMenuItem {...item} key={index} />
          </NavLink>
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {a}
      {MenuItemChildren}
    </>
  );
};

AppMenuItem.propTypes = AppMenuItemPropTypes;

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      backgroundColor: "#ffffff",
    },
    listitemtext: {
      fontSize: "1rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.875rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.875rem",
      },
    },
    listitemtext35: {
      fontSize: "0.875rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.75rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
    },
    listitemtext30: {
      fontSize: "0.875rem",
      [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
        fontSize: "0.75rem",
      },
      [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "0.75rem",
      },
    },
    menuItemIcon: {
      "& .MuiSvgIcon-root": {
        Width: "24px",
        height: "24px",
        [`@media screen and (max-width: ${breakpoints.values.lg}px)`]: {
          Width: "22px",
          height: "22px",
        },
        [`@media screen and (max-width: ${breakpoints.values.md}px)`]: {
          Width: "20px",
          height: "20px",
        },
      },
    },
    active: {
      color: "#757575",
      background: "#FAFAFA",
      "& a.active": {
        color: "#0070C0",
        fontWeight: "500",
        "& div.MuiListItemButton-root": {
          backgroundColor: "#ECEFF1",
        },
      },
    },
  })
);

export default AppMenuItem;
