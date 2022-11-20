import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/ward/Dashboard";
import DrugUsage from "./pages/ward/DrugUsage";
import Recieved from "./pages/ward/Recieved";
import Order from "./pages/ward/Order";
import ViewWard from "./pages/ward/ViewWard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drugUsage" element={<DrugUsage />} />
          <Route path="/recieved" element={<Recieved />} />
          <Route path="/order" element={<Order />} />
          <Route path="/view" element={<ViewWard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
