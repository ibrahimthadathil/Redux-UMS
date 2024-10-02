import {createSlice} from '@reduxjs/toolkit'

const user=localStorage.getItem('user');
const initialState =user?JSON.parse(user):null

export const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        setUser:(state,{payload})=>{
            localStorage.setItem('user',JSON.stringify(payload))
            return payload
            
        },
        clearUser:state=>{
            localStorage.removeItem('user')
          return null
        },
        updateUserData:(state,{payload})=>{
                   
            localStorage.setItem('user',JSON.stringify(payload))
            return payload
        },
        DeleteUser:(state,{payload})=>{
            const user = JSON.parse(localStorage.getItem('user')) 
            if(payload==user._id)return null
            
        }
    }
})
export const {setUser,clearUser,updateUserData,DeleteUser}= userSlice.actions

export default userSlice.reducer