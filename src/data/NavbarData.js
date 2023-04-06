import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import ViewListIcon from "@mui/icons-material/ViewList";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/pharmacy-dashboard",
    userType: ["PHARMACIST"],
  },
  {
    id: 3,
    title: "Drug Usage",
    icon: <MedicalServicesIcon />,
    path: "/drugUsage",
    userType: ["WARDUSER"],
  },
  {
    id: 4,
    title: "Order",
    icon: <ShoppingCartIcon />,
    path: "/order",
    userType: ["WARDUSER"],
  },

  {
    id: 5,
    title: "Receive Stocks",
    icon: <MedicationIcon />,
    path: "/received-ward-stocks",
    userType: ["WARDUSER"],
  },

  {
    id: 6,
    title: "Drugs",
    icon: <MedicalServicesIcon />,
    path: "/drugs",
    userType: ["PHARMACIST"],
  },
  {
    id: 7,
    title: "Inventory",
    icon: <InventoryIcon />,
    path: "/pharmacyinventory",
    userType: ["PHARMACIST", "WARDUSER"],
  },
  {
    id: 8,
    title: "Orders",
    icon: <ShoppingCartIcon />,
    path: "/recieved-orders",
    userType: ["PHARMACIST"],
  },
  {
    id: 9,
    title: "Received Stocks",
    icon: <MedicationIcon />,
    path: "/recieved-stocks",
    userType: ["PHARMACIST"],
  },
  {
    id: 10,
    title: "View Wards",
    icon: <LocalPharmacyIcon />,
    path: "/viewwards",
    userType: ["PHARMACIST"],
  },

  {
    id: 11,
    title: "Reports",
    icon: <ShowChartIcon />,
    path: "/pharmacy-reports",
    userType: ["PHARMACIST", "WARDUSER"],
  },
  {
    id: 12,
    title: "Add new users",
    icon: <PersonAddIcon />,
    path: "/signup",
    userType: ["PHARMACIST"],
  },
];
