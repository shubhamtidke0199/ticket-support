import React, { useEffect, useState } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {getAllTickets, reset} from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import Pagination from "../components/Pagination"
// import { useSearchParams } from "react-router-dom"

function AdminTickets() {
    const { tickets, lastPage, isLoading, isSuccess } = useSelector(
        (state) => state.admin );
    const {status} = useSelector(
        (state) => state.status
    );
    // console.log(status);
    
    const [pageNo, setPageNo] = useState(1);
    const dispatch = useDispatch()

    useEffect(()=>{
        return () => {
            if(isSuccess){
                dispatch(reset())
            }

        }
        //eslint-disable-next-line
    }, [isSuccess])

    useEffect(()=>{
        const ticketsData = {
            pageNo,
            status,
          };
        dispatch(getAllTickets(ticketsData))
        //eslint-disable-next-line
    },[pageNo, status] )

    if(isLoading){
        return <Spinner/>
    }

    
  return (
    <>
        <BackButton url='/admin' />
        <h1>Tickets</h1>
        <div className="tickets">
            <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
            </div>
            {tickets && tickets? tickets.map((ticket) =>(
                <TicketItem key={ticket._id} ticket={ticket} />
            )): <div style={{padding:"50px"}}>No tickets at the moment</div>}
        </div>
        <Pagination  pageNo={pageNo} 
        setPageNo={(pageNo) => setPageNo(pageNo)} 
        lastPage={lastPage}/>
    </>
  )
}

export default AdminTickets
