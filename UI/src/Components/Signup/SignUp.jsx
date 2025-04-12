import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'sonner'
import { setUser } from '../../store/slice/userSlice'
import { useRef } from 'react'
export default function SignUp() {


const [formData,setData] = useState({})
const [loading,setLoading] = useState(false)
const navigate = useNavigate()
const dispatch=useDispatch()
const user=useSelector(state=>state.user);
const handleChange= (e) => {
  setData({...formData,[e.target.id]:e.target.value})
  }
  const validation = ()=>{
   
    const {username,email,password} = formData
   
    if(!username&&!email&&!password||(username?.trim()==''||email?.trim()==''||password?.trim()=='')){

    toast.error('field can not be empty')
      return false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if(username?.length<4 ){
      toast.error('username minimum 4 required')
      return false
    }
    if(password.length<6){
      toast.error('minimum 6 character Required')
      return false
    }

   
    return true
    
  }
const handleSubmit = async(e)=> {
   e.preventDefault()
  if(validation()){
      try {

        setLoading(true)
        const {data} = await axios.post('/api/auth/signup', formData);
        dispatch(setUser(data.res))
        toast.success(data.message)
        setData({})
        setLoading(false)
         navigate('/profile')

        } catch (error) {

        toast.error(error.response.data.message  )
        setLoading(false)

        }
 }
 
}
useEffect(()=>{
  if(user?.is_admin==false){
  
    navigate('/profile')
  }else if(user?.is_admin){
    navigate('/dash')
  }
    
},[user])
  return (
    <>
    
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img 
      alt="Your Company"
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
      className="mx-auto h-10 w-auto"
    />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign Up to your account
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} method="POST" className="space-y-6">
    <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2  ">
          <input
            id="username"
            name="username"
            type="text"
            value={formData?.username || ""}
            autoComplete="username"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2 ">
          <input
            id="email"
            name="email"
            type="email"
            value={formData?.email || ""}
            autoComplete="email"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange} />
        </div>
      </div>
      

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
         
        </div>
        <div className="mt-2 ">
          <input
            id="password"
            name="password"
            type="password"
            value={formData?.password || ""}
            autoComplete="current-password"
            className="block w-full rounded-md ps-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={handleChange} />
        </div>
      </div>
     

      <div>
        <button disabled={loading}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? 'Loading..': 'Sign Up' }
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account ?
      <Link to='/SignIn'>
      <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ps-2">
        Sign In
      </span>
      </Link>
    </p>
  </div>
</div>

    </>


  )
}
