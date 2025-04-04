import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { FaTicketAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { selectStatus } from '../features/status/statusSlice';
import { toast } from 'react-toastify';
// import Dashboard from '../components/Dashboard';

function Admin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusValue, setStatusValue] = useState('')
  


  const onSubmit = (e) => {
    e.preventDefault();
    try {
      setDisableB(true);
      dispatch(selectStatus(statusValue))
      toast.success("Opening tickets Page");
      navigate("/admin/tickets")
    } catch (error) {
      toast.error(error);
    }
  } 

  useEffect(() => {
    setStatusValue("");
    setDisableB(true);
  },[])

  const [disableB, setDisableB] = useState(true)
  const disabledButton = () =>{
    setDisableB(false) 
  } 
  
 

  return (
    <>
   <section className="heading">
     <h2>Admin Panel</h2>
     <p>Please choose form an option below</p>
   </section>
   <form onSubmit={onSubmit}>
          <div className="form-group">
            <select
              name="status"
              id="status"
              value={statusValue}
              onClick={disabledButton}
              onChange={(e) => setStatusValue(e.target.value)}
              style={{textAlign: "center", borderColor:"#1d1d1d"}}
            >
              <option value="" disabled hidden>Choose ticket type</option>
              <option value="">All</option>
              <option value="new">New</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="form-group" >
            <button className="btn btn-block" disabled={disableB} >
              <FaTicketAlt />
              View tickets</button>
          </div>
          </form>
          {/* <Dashboard/> */}

 </>
  )
}

export default Admin