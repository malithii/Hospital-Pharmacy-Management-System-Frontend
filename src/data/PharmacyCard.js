import DoneIcon from "../images/DoneIcon.png";
import medicine1 from "../images/medicine-1.png";
import medicine2 from "../images/medicine-2.png";
import order from "../images/order.png";
const PharmacyCard = [
  {
    image: DoneIcon,
    value: 340,
    title: "Total Medicines",
    buttonTitle: "View Inventory",
  },
  {
    image: medicine1,
    value: 11,
    title: "Low Stocks",
    buttonTitle: "View Inventory",
  },
  {
    image: order,
    value: 1,
    title: "Pending Orders",
    buttonTitle: "View Orders",
  },
  {
    image: medicine2,
    value: "26/11",
    title: "Drug Usage",
    buttonTitle: "Add Drug Usage",
  },
];

export default PharmacyCard;
