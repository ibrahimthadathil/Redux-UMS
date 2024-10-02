import React from 'react'
import Dash from '../Components/Admin/Dashboard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const navigate =useNavigate()
    const admin = useSelector(state=>state.user)
    useEffect(()=>{
        if(!admin.is_admin)navigate('/profile')
    },[])
  return (
    <>
    {admin.is_admin && <Dash/>}
    
    </>
  )
}
