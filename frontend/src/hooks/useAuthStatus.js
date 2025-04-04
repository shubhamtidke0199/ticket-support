import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = ()=>{
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const [Admin, setAdmin] = useState(false)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        if(user?.isAdmin && (user?.isAdmin === true)){
            setAdmin(true);
        } else {
            setAdmin(false);
        }
        setCheckingStatus(false)

    }, [user])


    return { loggedIn, Admin, checkingStatus}

}