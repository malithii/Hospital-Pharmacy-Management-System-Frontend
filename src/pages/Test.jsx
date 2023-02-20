// import {
//   Button,
//   Chip,
//   Divider,
//   Grid,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import { useLocation, useSearchParams } from "react-router-dom";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { acceptOrder } from "../../../App/orderService";
// import { showAlert } from "../../../App/alertService";

// const DetailedOrders = () => {
//   const location = useLocation();

//   console.log(location.state);

//   const [order, setOrder] = useState(location.state.detailedOrder.orderItems);
//   const [orderItem, setOrderItem] = useState({});
//   const [batch, setBatch] = useState("");
//   const [quantityIssued, setQuantityIssued] = useState(0);
//   const pharmacist = useSelector((state) => state.loginHPMS._id);

//   // console.log("issue order");
//   // console.log(order);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     resetField,
//     setValue,
//   } = useForm();

//   const reqBody = {
//     _id: location.state.detailedOrder._id,
//     wardUser: location.state.detailedOrder.wardUser._id,
//     pharmacist: pharmacist,
//     orderItems: order,
//   };
//   const onSubmit = () => {
//     console.log("submit");
//     console.log(reqBody);
//     acceptOrder(reqBody, (response) => {
//       console.log(response);
//       showAlert("Order accepted successfully", "success");
//     });
//   };

//   return (
//     <Box>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
//                 <Typography fontWeight={"bold"}>Ward: </Typography>
//                 <Typography fontWeight={"bold"}>
//                   {location.state.detailedOrder.wardUser.wardNo}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} lg={4} sx={{ display: "flex" }}>
//                 <Typography fontWeight={"bold"}>Date: </Typography>
//                 <Typography fontWeight={"bold"}>
//                   {location.state.detailedOrder.date.slice(0, 10)}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={12}
//                 lg={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "end",
//                   alignItems: "center",
//                 }}
//               >
//                 <Button variant="contained" onClick={handleSubmit(onSubmit)}>
//                   Issue
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           {order.map((e) => (
//             <Box sx={{ bgcolor: "white", p: 4, borderRadius: 3, mt: 2 }}>
//               <Grid container spacing={2}>
//                 <Grid
//                   item
//                   xs={12}
//                   lg={4}
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   <Chip label={e.drug.drugId} />
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   lg={2}
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   <Typography>{e.quantityOrdered}</Typography>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   lg={6}
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   <Typography>Batch</Typography>
//                   <TextField
//                     id="batch "
//                     size="small"
//                     sx={{ ml: "20px", mr: "30px" }}
//                     onChange={(e) => {
//                       setBatch(e.target.value);
//                     }}
//                   />
//                   <Typography>Quantity</Typography>
//                   <TextField
//                     id="quantityIssued"
//                     size="small"
//                     sx={{ ml: "20px" }}
//                     onChange={(e) => {
//                       setQuantityIssued(e.target.value);
//                     }}
//                   />
//                   <IconButton>
//                     {"   "}{" "}
//                     <AddCircleIcon
//                       onClick={() => {
//                         console.log(e);
//                         setOrderItem(e);
//                         console.log(batch);
//                         console.log(quantityIssued);
//                         orderItem.issueDrugs.push({
//                           batch: batch,
//                           quantityIssued: quantityIssued,
//                         });
//                         setOrderItem("");
//                       }}
//                     />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid container sx={{ pt: 1 }}>
//                 <Grid item lg={12}>
//                   <Chip label="Issue Drugs" />
//                 </Grid>

//                 {e.issueDrugs.map((a) => (
//                   <>
//                     <Grid
//                       item
//                       xs={12}
//                       lg={2}
//                       sx={{ display: "flex", alignItems: "center" }}
//                     >
//                       <Typography>Batch : </Typography>
//                       <Typography>{a.batch}</Typography>
//                     </Grid>
//                     <Grid
//                       item
//                       xs={12}
//                       lg={2}
//                       sx={{ display: "flex", alignItems: "center" }}
//                     >
//                       <Typography>Quantity : </Typography>
//                       <Typography>{a.quantityIssued}</Typography>
//                     </Grid>
//                   </>
//                 ))}
//               </Grid>
//             </Box>
//           ))}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DetailedOrders;
