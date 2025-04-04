import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin";
import AdminTickets from "./pages/AdminTickets";
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         {/**-----------------------------------------------------------*/}            
            <Route path="/admin" element={<AdminRoute/>}>
              <Route path="/admin" element={<Admin/>}/>
            </Route>

            <Route path="/admin/tickets" element={<AdminRoute/>}>
              <Route path="/admin/tickets" element={<AdminTickets/>}/>
            </Route>

            <Route path="/admin/ticket/:ticketId" element={<AdminRoute/>}>
            <Route path="/admin/ticket/:ticketId" element={<Ticket/>}/>
            </Route>
          {/**-----------------------------------------------------------*/}  
            <Route path="/new-ticket" element={<PrivateRoute/>}>
              <Route path="/new-ticket" element={<NewTicket/>}/>
            </Route>
            <Route path="/tickets" element={<PrivateRoute/>}>
              <Route path="/tickets" element={<Tickets/>}/>
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivateRoute/>}>
              <Route path="/ticket/:ticketId" element={<Ticket/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
