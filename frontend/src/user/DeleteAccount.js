import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../core/Base';
import { deleteaccount } from './Authentication';
import { User } from './SessionData';

function DeleteAccount() {
  
  const user = User();

  let navigate = useNavigate();

  const [inputs,setInputs] = useState({
    email : "",
    password : "",
  })
  const {email,password} = inputs;

  const handleInputs = (name) => (event) => {
    setInputs({...inputs,[name]:event.target.value})
  }

  const [showPassword,setShowPassword] = useState(false)
  const showpassword = () => {
    setShowPassword(!showPassword)
  }

  const [errors,setErrors] = useState({
    EmailError : "",
    PasswordError : "",
  })
  const {EmailError,PasswordError} = errors;

  const handleSubmit = (event) => {
    event.preventDefault();
    if(email!==user['email']){
      setErrors({EmailError:"Invalid email"})
    }
    else if(email===user['email']){ 
      setErrors({EmailError:""})
    deleteaccount({email,password})
    .then((data) => {
      Object.entries(data).map(([key,value]) =>{
        if(key==="EmailError"){
           setErrors({EmailError:value,PasswordError:""})
        }
        else if(key==="PasswordError"){
          setErrors({PasswordError:value,EmailError:""})
        }
        else if(key==="success"){
          localStorage.removeItem('user');
          sessionStorage.setItem('success',JSON.stringify(data));
          window.location.reload();
          navigate('/');
        }
        return true;
      })
    })
  }
}
  return (
    <Base>
    <h3>Delete Account</h3>
     <form className="was-validated" onSubmit={handleSubmit}>

     <div className="mt-3">
     <input type="email" id="email" value={email} onChange={handleInputs('email')} className="form-control" required />   
      <div className="invalid-feedback">Please enter a valid email</div>
      {EmailError !== "" ?
      <div className="error text-danger">{EmailError}</div>
      :""}
    </div> 

    <div className="mt-3">
      <input type={showPassword ? "text" : "password" } id="password" 
      value={password} onChange={handleInputs('password')} className="form-control" required/>
      <div className="invalid-feedback">Please fill this field</div>
      {PasswordError !== "" ?
      <div className="error text-danger">{PasswordError}</div>
      :""}
    </div>

    <div className="mt-3 form-check form-switch">
        <input type="checkbox" onClick={showpassword} className='form-check-input shadow-none'/> 
        <label className="form-check-label">Show Password</label>
      </div>
      
      <button className='mt-3 btn btn-danger mx-auto shadow-none' type="submit">Delete Account</button>

    </form>       
    </Base>
  )
}

export default DeleteAccount;