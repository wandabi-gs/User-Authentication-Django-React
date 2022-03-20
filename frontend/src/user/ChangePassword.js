import React, { useState } from 'react';
import Base from '../core/Base';
import { changepassword } from './Authentication';
import { User } from './SessionData';

function ChangePassword() {
  const user = User();
  const email = user['email'];

  const [showPassword,setPasswordshow] = useState(false)
  const handlePassword = () => {
    setPasswordshow(!showPassword)
  }

  const [current_password,setCurrentPassword] = useState('');
  const [new_password,setNewPassword] = useState('');
  const [confirm_password,setConfirmPassword] = useState('');

  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value)
  }

  const handleNewPassword = (event) =>{
    setNewPassword(event.target.value);
    if(confirm_password !== ''){
      if(event.target.value === confirm_password){
        setErrors({PasswordMatchError:""})
      }
      else if(event.target.value !== confirm_password){
        setErrors({PasswordMatchError:"Your passwords should match"})
      }
    }
  }

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    if(event.target.value === new_password){
      setErrors({PasswordMatchError:""})
    }
    else if(event.target.value !== new_password){
      setErrors({PasswordMatchError:"Your passwords should match"})
    }
  }

  const [errors,setErrors] = useState({
    PasswordError:"",
    PasswordMatchError : ""
  })

  const {PasswordError,PasswordMatchError} = errors;

  const handleSubmit = (event) => {
    event.preventDefault();
    if(new_password===confirm_password && new_password.length >8){
      changepassword({email,current_password,new_password})
      .then((data) =>{
        Object.entries(data).map(([key,value]) => {
          if(key==="PasswordError"){
            setErrors({PasswordError:value,PasswordMatchError:""})
          }
          else if(key==="success"){
             sessionStorage.setItem('success',JSON.stringify(data))
          }
          return true;
        })
      })
    }
  }

  return (
    <Base>
    <h3>Change Password</h3>
    <form onSubmit={handleSubmit} className="was-validated">
      <div className="mt-3">
      <input type={showPassword ? "text" : "password" } id="current_password"  onChange={handleCurrentPassword}
      value={current_password} placeholder="Enter current password"  className="form-control" required/>
      {PasswordError !== "" ?
      <div className="text-danger">{PasswordError}</div>
      :""}
      </div>

      <div className="mt-3">
      <input type={showPassword ? "text" : "password" } id="new_password" onChange={handleNewPassword} value={new_password}
       minLength="8" placeholder="Enter new password (minimum 8 characters)"  className="form-control" required/>

      <div className="invalid-feedback">Enter a password of atleast 8 characters</div>

      </div>

      <div className="mt-3">
      <input type={showPassword ? "text" : "password" }  id="confirm_password" onChange={handleConfirmPassword} value={confirm_password}
      minLength="8" placeholder="Re-enter new password" className="form-control" required/>
      {PasswordMatchError !== "" ?
      <div className="text-danger">{PasswordMatchError}</div>
      :""}
      </div>

      <div className="mt-3 form-check form-switch">
        <input type="checkbox" onClick={handlePassword} className="form-check-input shadow-none" />
        <label className="form-check-label">show password</label>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary shadow-none">Proceed</button>
      </div>
    </form>
    </Base>
  )
}

export default ChangePassword;