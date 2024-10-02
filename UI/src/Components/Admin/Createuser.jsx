import React, { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
export default function Createuser({save,fn}) {
const [formdata,setForm] = useState({})

  const handleChange =(e)=>{
    setForm({...formdata,[e.target.id]:e.target.value})
  }
  const validation = ()=>{
    const {userName,email,password} = formdata
    if(!userName&&!email&&!password||(userName?.trim()==''||email?.trim()==''||password?.trim()=='')){

      toast.error('field can not be empty')
        return false
      }
      

      if (!email.endsWith('@gmail.com')) {
        toast.error('Please enter a valid email address');
        return false;
      }
      
      if(userName?.length<4 ){
        toast.error('username minimum 4 required')
        return false
      }
      if(password.length<6){
        toast.error('minimum 6 character Required')
        return false
      }
  
     
      return true
  }

  const formSubmit =async(e)=>{
    e.preventDefault()
    try {
      if(validation()){
        const {data}= await axios.post('/api/admin/dash/create',formdata)
        toast.success(data.msg)
        save(false)
        fn()
      }
    } catch (error) {
      toast.error(error.response.data.msg)
      
    }
  }


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-300 shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            Create New User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                
                  onChange={handleChange}
                  className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
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
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block ps-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>

          
        </div>
      </div>
    </>
  )
}
