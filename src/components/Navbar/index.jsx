import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavbarData } from "../../data/NavbarData";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Badge, ListItemAvatar, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUnreadNotifications } from "../../App/notificationsService";
import { useState } from "react";
import medicine2 from "../../images/medicine-2.png";
import logo from "../../images/medlink-logo.png";
import { logout } from "../../reducers/loginSlice";

const drawerWidth = 230;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#1976d2",
  //icons and text color white
  color: "white",
  "& .MuiListItemIcon-root": {
    color: "white",
  },
  "& .MuiListItemText-primary": {
    color: "white",
  },
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "#1976d2",
  },
  "& .MuiListItemButton-root.Mui-selected": {
    backgroundColor: "#1976d2",
  },
  "& .MuiListItemButton-root.Mui-selected:hover": {
    backgroundColor: "#1976d2",
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#1976d2",
  //icons and text color white
  color: "white",
  "& .MuiListItemIcon-root": {
    color: "white",
  },
  "& .MuiListItemText-primary": {
    color: "white",
  },
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "#1976d2",
  },
  "& .MuiListItemButton-root.Mui-selected": {
    backgroundColor: "#1976d2",
  },
  "& .MuiListItemButton-root.Mui-selected:hover": {
    backgroundColor: "#1976d2",
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { type } = useSelector((state) => state.loginHPMS);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //////////////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const isMenuOpen2 = Boolean(anchorEl2);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifiMenuOpen = (event) => {
    console.log(notifications);
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifiClose = () => {
    setAnchorEl2(null);
  };

  const viewNotifications = () => {
    console.log("clicked");
    navigate("/pharmacyinventory");
    handleNotifiClose();
  };

  const dispatch = useDispatch();

  const onClickLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={onClickLogout}>Logout</MenuItem>
    </Menu>
  );

  useEffect(() => {
    getUnreadNotifications({ user: user }, (response) => {
      console.log(response);
      setNotifications(response.notifications);
    });
  }, []);

  const menuId2 = "primary-search-account-menu2";
  const renderMenu2 = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId2}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen2}
      onClose={handleNotifiClose}
    >
      {!notifications ? (
        <MenuItem onClick={handleNotifiClose}>No Notifications</MenuItem>
      ) : (
        notifications.map((notification) => [
          <MenuItem key={notification._id} onClick={viewNotifications}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={medicine2} />
              </ListItemAvatar>
              <ListItemText
                primary={notification.message}
                secondary={<>{"Click to view inventory"}</>}
              />
            </ListItem>
          </MenuItem>,
          <Divider
            key={notification.id + "_divider"}
            variant="inset"
            component="li"
          />,
        ])
      )}
    </Menu>
  );

  const user = useSelector((state) => state.loginHPMS._id);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="logo" width="100px" />
          <Typography variant="h6" noWrap component="div">
            HOSPITAL PHARMACY MANAGEMENT SYSTEM
          </Typography>

          {/* ////////////////////////////////////////// */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon onClick={handleNotifiMenuOpen} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* ///////////////////////////////// */}
        </Toolbar>
        {renderMenu}
        {renderMenu2}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {NavbarData.map((item) => {
            {
              /* if (item.userType.includes(type)) */
            }
            {
              /* if (item.userType.includes("PHARMACIST"))  */
            }
            if (item.userType.includes(type)) {
              return (
                <Link
                  to={item.path}
                  style={{ textDecoration: "none ", color: "black" }}
                >
                  <ListItem
                    key={item.id}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            }
          })}
        </List>
        <Divider />

        {/* <List>
          {["All mail", "Trash", "Spam", "g"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: " #e9f0f9 ",
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        {/* <Container fixed sx={{ backgroundColor: "black" }}> */}
        <Outlet />
        {/* </Container> */}
      </Box>
    </Box>
  );
}
