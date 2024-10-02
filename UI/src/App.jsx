import { Routes,Route, Navigate } from "react-router-dom"
import SignUp from "./pages/signUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import { useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard"


function App() {
const user=useSelector(state=>state.user);


  return (
   <>
   <Routes>
      <Route path="/" element={<Navigate to={'/SignIn'}/>}/>
      <Route path="/signin" element={!user?<SignIn/>:<Navigate replace={true} to={'/profile'}/>}/>
      <Route path="/signup" element={user?<Navigate replace={true} to={'/profile'}/> :<SignUp/> } />
      <Route path="/profile" element={!user?<Navigate replace={true} to={'/signin'}/> :<Profile/>} />
      <Route path="/dash" element={!user?<Navigate replace={true} to={'/signin'}/>  :<Dashboard/>} />
   </Routes>

   </>
  )
}

export default App
