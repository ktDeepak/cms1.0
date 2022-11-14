import React,{useContext} from 'react'
import {BrowserRouter as Router,Navigate,Route,Routes} from 'react-router-dom'
import { DataContext } from '../GlobalContext'
import ProtectedRoute from '../middleware/protectedRoute'
import history from '../middleware/History'

import{ToastContainer} from 'react-toastify'
import About from './Default/About'
import Contact from './Default/Contact'
import Home from './Default/Home'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Pnf from './Util/Pnf'
import Menu from './Header/Menu'
import AdminDashboard from './Admin/AdminDashboard'
import AdminProfile from './Admin/AdminProfile'
import StudentDashboard from './Student/StudentDashboard'
import StudentProfile from './Student/StudentProfile'
import TrainerDashboard from './Trainer/TrainerDashboard'
import TrainerProfile from './Trainer/TrainerProfile'


function Main() {

  const context=useContext(DataContext)
  const [isLogged]=context.data.authApi.isLogged
  const [isStudent]=context.data.authApi.isStudent
  const [isTrainer]=context.data.authApi.isTrainer
  const [isAdmin]=context.data.authApi.isAdmin

  return (
    <Router history={history}>
        <Menu/>
        <ToastContainer autoClose={5000} position={'top-right'}/>
        <Routes>
            <Route path={`/`} element={
            isLogged?
            (
              <>
              {isAdmin? <Navigate to={`/admin/dashboard`}/>:null}
              {isStudent? <Navigate to={`/student/dashboard`}/>:null}
              {isTrainer? <Navigate to={`/trainer/dashboard`}/>:null}
              </>):<Home/>
            }/>
            {/* <Route path={`/home`} element={<Home/>}/> */}
            <Route path={`/About`} element={isLogged? <Navigate to={`/*`}/>:<About/>}/>
            <Route path={`/contact`} element={isLogged? <Navigate to={`/*`}/>:<Contact/>}/>
            <Route path={`/login`} element={isLogged? <Navigate to={`/*`}/>:<Login/>}/>
            <Route path={`/register`} element={isLogged? <Navigate to={`/*`}/>:<Register/>}/>
            <Route path={`/*`} element={<Pnf/>}/>

            {
              isAdmin?(
                <Route element={<ProtectedRoute/>}>
                  <Route path={`/admin/dashboard`} element={<AdminDashboard/>}></Route>
                  <Route path={`/admin/profile`} element={<AdminProfile/>}></Route>
                </Route>
              ):null
            }
            {
              isLogged & isStudent?(
                <Route element={<ProtectedRoute/>}>
                   <Route path={`/student/dashboard`} element={<StudentDashboard/>}></Route>
                  <Route path={`/student/profile`} element={<StudentProfile/>}></Route>
                </Route>
              ):null
            }
            {
              isLogged & isTrainer?(
                <Route element={<ProtectedRoute/>}>
                   <Route path={`/trainer/dashboard`} element={<TrainerDashboard/>}></Route>
                  <Route path={`/trainer/profile`} element={<TrainerProfile/>}></Route>
                </Route>
              ):null
            }
             <Route path={`/*`} element={<pnf/>} />
        </Routes>
    </Router>
  )
}

export default Main