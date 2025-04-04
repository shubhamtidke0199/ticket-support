import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import AccordionFeature from "../components/AccordionFeature";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function Home() { 
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  useEffect(() => {
    if (user && (user?.isAdmin === true)) {navigate("/admin")}
    //eslint-disable-next-line
  },[user])
  
  // if (user?.isAdmin && (user?.isAdmin === true)) {navigate("/admin")}
  return (
    <>
      <section className="heading">
        <h2>What do you need help with ?</h2>
        <p>Please choose form an option below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create new ticket
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View my tickets
      </Link>

      <div className="common-articles">
        <h2>Common Articles</h2>
        <AccordionFeature/>

      </div>
    </>
  );
}

export default Home;
