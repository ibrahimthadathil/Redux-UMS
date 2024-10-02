import React, { useEffect } from 'react'
import Profile from '../Components/profile/Profile'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Profiles() {
  const navigate = useNavigate()
  const user=useSelector(state=>state.user);
  useEffect(()=>{

    if(!user) navigate('/signin')
  },[user])
  return (
    <>
    <Profile/>
    </>
  )
}
