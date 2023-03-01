import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ViewListIcon from "@mui/icons-material/ViewList";

export const NavbarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    userType: ["WARDUSER"],
  },
  {
    id: 2,
    title: "Drug Usage",
    icon: <MedicalServicesIcon />,
    path: "/drugUsage",
    userType: ["WARDUSER"],
  },
  {
    id: 3,
    title: "Order",
    icon: <ShoppingBagIcon />,
    path: "/order",
    userType: ["WARDUSER"],
  },

  {
    id: 5,
    title: "Reports",
    icon: <ViewListIcon />,
    path: "/wardreports",
    userType: ["WARDUSER"],
  },
  {
    id: 6,
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/pharmacy-dashboard",
    userType: ["PHARMACIST"],
  },
  {
    id: 7,
    title: "Drugs",
    icon: <ShoppingBagIcon />,
    path: "/drugs",
    userType: ["PHARMACIST"],
  },
  {
    id: 8,
    title: "View Wards",
    icon: <InventoryIcon />,
    path: "/viewwards",
    userType: ["PHARMACIST"],
  },
  {
    id: 9,
    title: "Inventory",
    icon: <MedicalServicesIcon />,
    path: "/pharmacyinventory",
    userType: ["PHARMACIST", "WARDUSER"],
  },
  {
    id: 10,
    title: "Received Stocks",
    icon: <ViewListIcon />,
    path: "/recieved-stocks",
    userType: ["PHARMACIST"],
  },
  {
    id: 11,
    title: "Orders",
    icon: <ViewListIcon />,
    path: "/recieved-orders",
    userType: ["PHARMACIST"],
  },
  {
    id: 12,
    title: "Reports",
    icon: <ViewListIcon />,
    path: "/pharmacy-reports",
    userType: ["PHARMACIST"],
  },
  {
    id: 13,
    title: "Receive Stocks",
    icon: <ViewListIcon />,
    path: "/received-ward-stocks",
    userType: ["WARDUSER"],
  },
];
