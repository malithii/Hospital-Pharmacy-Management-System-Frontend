import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ViewListIcon from "@mui/icons-material/ViewList";

export const Navbar2Data = [
  {
    id: 1,
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },

  {
    id: 2,
    title: "Order",
    icon: <ShoppingBagIcon />,
    path: "/order",
  },
  {
    id: 3,
    title: "Inventory",
    icon: <InventoryIcon />,
    path: "/wardinventory",
  },
  {
    id: 4,
    title: "Drug Usage",
    icon: <MedicalServicesIcon />,
    path: "/drugs",
  },

  {
    id: 5,
    title: "View",
    icon: <ViewListIcon />,
    path: "/view",
  },
];
