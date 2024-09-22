import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
const userContext= createContext();
const ContextProvider = ({children}) => {
  // const navigate=useNavigate();
    const [user,setUser]= useState(null);
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    },[]);
  return (<userContext.Provider value={{user,setUser}}>{children}</userContext.Provider>);
}
export const UserState=()=>{
    return useContext(userContext);
}
export default ContextProvider;