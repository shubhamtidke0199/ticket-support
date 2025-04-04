import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuthStatus } from '../hooks/useAuthStatus'
import { openTicketAdmin } from './../features/tickets/ticketSlice';
import { useDispatch } from 'react-redux';

function TicketItem({ticket}) {
  const {Admin} = useAuthStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Admin button for viewing ticket
  const onTicketOpen = () => {
   if (ticket.status === "new"){
    dispatch(openTicketAdmin(ticket._id));
    toast.success("Opening New Ticket");
    navigate(`/admin/ticket/${ticket._id}`)
    } else if (ticket.status === "open") {
    toast.success("Opening Viewed Ticket");
    navigate(`/admin/ticket/${ticket._id}`)
    } else {
    toast.success("Opening Closed Ticket ")
    navigate(`/admin/ticket/${ticket._id}`)
  }}

  return (<>
    <div className='ticket'>
        <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
        <div>{ticket.product}</div>
        <div className={`status status-${ticket.status}`}>
            {ticket.status}
        </div>
        { Admin?
          (<button 
           className ='btn btn-reverse btn-sm'
           onClick={onTicketOpen}>
          View
      </button>) :
      ( 
        <Link to={`/ticket/${ticket._id}`} className ='btn btn-reverse btn-sm'>
            View
        </Link>
      )}
        


    </div>
    </>
  )
}

export default TicketItem;