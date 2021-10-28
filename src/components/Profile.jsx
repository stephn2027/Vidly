import React,{ useEffect } from 'react'


export default function Profile({user}) {

    useEffect(()=>{
    const user = localStorage.getItem('token');
   
    },[])

    return (
       <h1>Profile
       {user}
       </h1>
       
    )
}
