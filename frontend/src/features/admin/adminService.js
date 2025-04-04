import axios from 'axios'

const API_URL = '/api/admin/tickets'




//GET USER TICKETS
const getAllTickets = async (ticketsData, token) => {
    const statusValue = ticketsData.status;
    const pageNo = ticketsData.pageNo;
    const API_FILTER_URL = statusValue !== ""?
     API_URL+`?status=${statusValue}&` :
     API_URL+`?`;
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    // console.log(API_FILTER_URL)
    const response = await axios.get(API_FILTER_URL+`page=${pageNo}`, config)
    // console.log(response.data);
    return response.data
   
}



const adminService = {
    getAllTickets
}

export default adminService;