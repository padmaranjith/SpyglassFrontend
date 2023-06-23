import { useGetUserInfoQuery } from "../api/goalApi"
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Landing(){
    
    const navigate = useNavigate();

    const { data :userData, refetch,isSuccess } = useGetUserInfoQuery();
    const handleLogin = () => {
        console.log("Login clicked")
        refetch();
         if(isSuccess){
            window.localStorage.setItem('username',userData.given_name)
            navigate('/userinfo');
         }
       
        };
   
return(
    <>
    <h3>Plan for your life</h3>
    
    <Button onClick={handleLogin} >Log In with Google</Button>
      
    </>
)
}