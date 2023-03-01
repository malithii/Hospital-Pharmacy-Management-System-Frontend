import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/ward/Dashboard";
import DrugUsage from "./pages/ward/DrugUsage";
import Order from "./pages/ward/Order";
import WardReports from "./pages/ward/WardReports";
import Login from "./pages/Login";
import Drugs from "./pages/pharmacy/Drugs";
import LandingPage from "./pages/LandingPage";
import UsageHistory from "./pages/ward/UsageHistory";

import ViewWards from "./pages/pharmacy/VIewWards";
import Suppliers from "./pages/pharmacy/Suppliers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./App/store";
import PharmacyInventory from "./pages/pharmacy/PharmacyInventory";
import SignUp from "./pages/SignUp";
import ViewFullReport from "./pages/ward/ViewFullReport";
import Profile from "./pages/Profile";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import RecievedStocks from "./pages/pharmacy/RecievedStocks";
import RecievedOrders from "./pages/pharmacy/RecievedOrders";
import PharmacyReports from "./pages/pharmacy/PharmacyReports";
import CustomSnackbar from "./components/CustomSnackbar";
import DetailedOrders from "./pages/pharmacy/DetailedOrders";
import Test from "./pages/Test";
import ReceiveWardStocks from "./pages/ward/ReceiveWardStocks";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomSnackbar />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/medlink" element={<LandingPage />} />
            <Route path="/userprofile" element={<Profile />} />
            <Route path="/" element={<Navbar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/drugUsage" element={<DrugUsage />} />
              <Route path="/order" element={<Order />} />
              <Route path="/wardreports" element={<WardReports />} />
              <Route path="wardfullreport" element={<ViewFullReport />} />
              <Route path="/drugs" element={<Drugs />} />
              <Route path="/drugusagehistory" element={<UsageHistory />} />

              <Route path="/viewwards" element={<ViewWards />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route
                path="/pharmacy-dashboard"
                element={<PharmacyDashboard />}
              />
              <Route path="recieved-stocks" element={<RecievedStocks />} />
              <Route
                path="/pharmacyinventory"
                element={<PharmacyInventory />}
              />
              <Route path="/recieved-orders" element={<RecievedOrders />} />
              <Route path="pharmacy-reports" element={<PharmacyReports />} />
              <Route path="/detailed-orders" element={<DetailedOrders />} />
              <Route
                path="/received-ward-stocks"
                element={<ReceiveWardStocks />}
              />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
