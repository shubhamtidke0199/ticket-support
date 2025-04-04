import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from "./Spinner"

const AdminRoute = () => {
    const {Admin, checkingStatus} = useAuthStatus()
    
    if(checkingStatus) {
        return <Spinner/>
    }

    return Admin ? <Outlet /> : <Navigate to = '/' />
}

export default AdminRoute;