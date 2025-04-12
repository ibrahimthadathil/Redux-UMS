import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setUser } from '../../store/slice/userSlice'
export default function SignIn() {
  const [formdata,setdata]=useState({})
  const [loading,setLoading] = useState(false)
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const handlechange=(e)=>{
    setdata({...formdata,[e.target.id]:e.target.value})
  }

  const validation =()=>{
    const {email,password}=formdata
    if(!email || !password || (email?.trim()==""||password?.trim()=="")){
      toast.error("Field can't be empty")
      return false
    }
   
    
    return true
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()

    if(validation()){
      try {
        
        
        setLoading(true)
        const {data} = await axios.post('/api/auth/signin',formdata)
        
        dispatch(setUser(data.res))
        toast.success(data.message)
        
        navigate('/profile')
        
      } catch (error) {
       console.log(error.message);
       
        toast.error(error.response.data.message)
        setLoading(false)
      }
     
      
    }

  }


  
  
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
      Sign in to your account
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={handlechange}
            autoComplete="email"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handlechange}
            autoComplete="current-password"
            className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? 'verifiying..':'Sign In'}
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account ? 
      <Link to='/signUp'>
      <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer ps-2">
        Sign Up
      </span>
      </Link>
    </p>
  </div>
</div>

    </>
  )
}
