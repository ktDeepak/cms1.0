import React,{useContext} from 'react'
import { DataContext } from '../GlobalContext'
import{Navigate,Outlet} from 'react-router-dom'

function ProtectedRoute() {
    
    const context=useContext(DataContext)
    const [token]=context.token
  return (
    <React.Fragment>
        {
            token?<Outlet/>:<Navigate to ={`/login`}/>
        }
    </React.Fragment>
  )
}

export default ProtectedRoute