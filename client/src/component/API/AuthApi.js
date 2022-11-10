import React,{useState,useEffect} from 'react'
import axios from 'axios'

function AuthApi(token) {
    const [currentUser,setCurrentUser]=useState(null)

    const [isLogged,setIsLogged]=useState(false)

    const[isStudent,setIsStudent]=useState(false)
    const[isAdmin,setIsAdmin]=useState(false)
    const[isTrainer,setIsTrainer]=useState(false)

    
    useEffect(()=>{
      if(token){
       const getData=async()=>{
         const out=await axios.get(`/api/v1/user/currentUser`,{
           headers:{
             Authorization:token}
      });
      console.log('current user info=',out)
      setCurrentUser(out.data.user)
      setIsLogged(true)
      if(out.data.user.role==="superadmin"){
        setIsAdmin(true)
      }
      if(out.data.user.role==="student"){
        setIsStudent(true)
      }
      if(out.data.user.role==="trainer"){
        setIsTrainer(true)
      }
    }

        getData()
      }
    },[token])

  return {
    currentUser:[currentUser,setCurrentUser],
    isLogged:[isLogged,setIsLogged],
    isStudent:[isStudent,setIsStudent],
    isAdmin:[isAdmin,setIsAdmin],
    isTrainer:[isTrainer,setIsTrainer]
   }
}

export default AuthApi