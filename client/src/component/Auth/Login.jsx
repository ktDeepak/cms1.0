import React from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {omit} from 'lodash'


function Login() {
  const [user,setUser]=useState({
    email:"",
    password:""
})

const navigate=useNavigate()

const[errors,setErrors]=useState({})



      //error printing logic
      const errPrint =(prop,msg)=>{
        setErrors({ ...errors,[prop]:msg})
      }

      //validate function
    const validate =(event,name,value)=>{
        switch(name){
            case"email":
                 if(value.length === 0){
                   errPrint(name, "email filed must be filled")
                }else if(!new RegExp(/^[a-z A-Z 0-9\S]+@[a-z\s]+\.[c][o][m]+$/).test(value)){
                   errPrint(name, "Invalid email format")
                }else{
                   let newOb=omit(errors,name);
                   setErrors(newOb);
                }
            
                break;

            case "password":
                if(value.length === 0){
                    errPrint(name, "mobile filed must be filled")
                 }else if(!new RegExp(/^[a-z A-Z 0-9\Sa-z\s]+$/).test(value)){
                    errPrint(name, "Invalid password")
                 }else{
                    let newOb=omit(errors,name);
                    setErrors(newOb);
                 }
                break;

            default:
                break;            
        }
    };

const readValue=(e)=>{
    const {name,value}=e.target;
    validate(e,name,value)
    setUser({...user,[name]:value})
}




const submitHandler=async(e)=>{
    e.preventDefault()
    try {
        console.log('user=',user)
        await axios.post(`/api/v1/auth/login`,user)
        .then(res=>{
            console.log('after login=', res.data);
            localStorage.setItem("loginToken",res.data.accessToken)
            toast.success(res.data.msg)
            // navigate('/')
            window.location.href="/"
        }).catch(err=>{
            toast.error(err.response.data.msg)
          //  console.log('error=',err)
        })
    } catch (err) {
        toast.error(err.message)
    }
}
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
            <h3>Login</h3>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className='card'>
                <div className="card-body">
                    <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="form-group mt-2">
                          <label htmlFor="email">Email</label>
                          <input type="email" name="email" value={user.email} onChange={readValue} id="email" placeholder="user@gmail.com" 
                          className="form-control" required/>
                          {
                            errors && errors.email?(
                              <div className="alert alert-danger">{errors.email}</div>
                            ):null
                           }
                        </div>
                        <div className="form-group mt-2">
                          <label htmlFor="password">Password</label>
                          <input name="password" value={user.password} onChange={readValue} id="password" 
                           className="form-control" required />
                            {
                             errors && errors.password?(
                             <div className="alert alert-danger">{errors.password}</div>
                              ):null
                             }
                          </div>  
                          <div className="form-group mt-2">
                          <input type="submit" value="Login" className="btn btn-outline-success" />
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}


export default Login