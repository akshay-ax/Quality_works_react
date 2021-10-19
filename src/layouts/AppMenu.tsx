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
          color: "#9E9E9E",
          pl: depth,
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
            className={classes.menuItemIcon}
            sx={{
              paddingLeft: "4px",
              ...(open && {
                color: "#0070C0",
              }),
            }}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          primary={title}
          inset={!Icon}
          disableTypography={true}
          sx={{ fontSize: "16px" }}
        />
        {isExpandable && !open && <ArrowRightIcon />}
        {isExpandable && open && <ArrowDropDownIcon />}
      </ListItemButton>
    );
  } else if (depth == 3) {
    var a = (
      <ListItemButton
        sx={{
          pl: depth,
          background: "rgba(236, 236, 236, 0.72)",
          color: "#757575",
          ...(open && {
            fontWeight: "500",
            color: "#212121",
          }),
        }}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon className={classes.menuItemIcon}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          disableTypography={true}
          sx={{ fontSize: "14px !important" }}
          primary={title}
          inset={!Icon}
        />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <ArrowRightIcon />}
        {isExpandable && open && <ArrowDropDownIcon />}
      </ListItemButton>
    );
  } else if (depth == 3.5) {
    var a = (
      <ListItemButton
        sx={{
          pl: 2,
        }}
        onClick={handleClick}
      >
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon className={classes.menuItemIcon}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          disableTypography={true}
          primary={title}
          inset={!Icon}
          sx={{
            fontSize: "14px !important",
          }}
        />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <ArrowRightIcon />}
        {isExpandable && open && <ArrowDropDownIcon />}
      </ListItemButton>
    );
  } else {
    var a = (
      <ListItemButton
        sx={{
          pl: depth,
          color: "#9E9E9E",
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
              paddingLeft: "12px",
              ...(open && {
                color: "#0070C0",
              }),
            }}
          >
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          primary={title}
          disableTypography={true}
          sx={{ fontSize: "16px " }}
          inset={!Icon}
        />
        {isExpandable && !open && <ArrowRightIcon />}
        {isExpandable && open && <ArrowDropDownIcon />}
      </ListItemButton>
    );
  }

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <NavLink
            to={`/analaytic${item.path}`}
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
    menuItemIcon: {
      Width: 56,
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
