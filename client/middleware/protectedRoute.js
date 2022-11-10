import React from 'react'
import { DataContext } from '../src/GlobalContext'
import{outlet,Navigate} from 'react-router-dom'

function protectedRoute() {
    
    const context=useContext(DataContext)
    const [token]=context.token
  return (
    <React.Fragment>
        {
            token?<outlet/>:<Navigate to ={`/login`}/>
        }
    </React.Fragment>
  )
}

export default protectedRoute