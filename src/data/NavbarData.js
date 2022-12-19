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
    userType: ["ADMIN", "USER"],
  },
  {
    id: 2,
    title: "Drug Usage",
    icon: <MedicalServicesIcon />,
    path: "/drugUsage",
    userType: ["ADMIN", "USER"],
  },
  {
    id: 3,
    title: "Order",
    icon: <ShoppingBagIcon />,
    path: "/order",
    userType: ["ADMIN"],
  },
  {
    id: 4,
    title: "Inventory",
    icon: <InventoryIcon />,
    path: "/wardinventory",
    userType: ["ADMIN"],
  },

  {
    id: 5,
    title: "View",
    icon: <ViewListIcon />,
    path: "/view",
    userType: ["ADMIN"],
  },
];
