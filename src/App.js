import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/ward/Dashboard";
import DrugUsage from "./pages/ward/DrugUsage";
import Order from "./pages/ward/Order";
import ViewWard from "./pages/ward/ViewWard";
import Login from "./pages/Login";
import Drugs from "./pages/pharmacy/Drugs";
import LandingPage from "./pages/LandingPage";
import UsageHistory from "./pages/ward/UsageHistory";
import WardInventory from "./pages/ward/WardInventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/medlink" element={<LandingPage />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drugUsage" element={<DrugUsage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/view" element={<ViewWard />} />
          <Route path="/drugs" element={<Drugs />} />
          <Route path="/drugusagehistory" element={<UsageHistory />} />
          <Route path="/wardinventory" element={<WardInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
