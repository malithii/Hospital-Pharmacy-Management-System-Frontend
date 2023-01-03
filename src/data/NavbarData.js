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
    id: 4,
    title: "Inventory",
    icon: <InventoryIcon />,
    path: "/wardinventory",
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
    title: "Drugs",
    icon: <ShoppingBagIcon />,
    path: "/drugs",
    userType: ["PHARMACIST"],
  },
  {
    id: 7,
    title: "View Wards",
    icon: <InventoryIcon />,
    path: "/viewwards",
    userType: ["PHARMACIST"],
  },
  {
    id: 8,
    title: "Inventory",
    icon: <MedicalServicesIcon />,
    path: "/pharmacyinventory",
    userType: ["PHARMACIST"],
  },
  {
    id: 9,
    title: "View",
    icon: <ViewListIcon />,
    path: "/view",
    userType: ["PHARMACIST"],
  },
];
