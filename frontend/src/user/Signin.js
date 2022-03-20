import React,{useState} from 'react';
import Base from '../core/Base';
import { useNavigate } from 'react-router-dom';
import { signin } from './Authentication';

function Signin() {
  let navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false)
  const handlePassword = () => {
    setShowPassword(!showPassword)
  }

  const [inputs,setInputs] = useState({
    username : "",
    password : "",
  })

  const{username,password} = inputs;

  const handleInputs = (name) => (event) => {
    setInputs({...inputs,[name]:event.target.value})
  }

  const [errors,setErrors] = useState({
    EmailError : "",
    PasswordError : "",
  })

  const {EmailError,PasswordError} = errors;

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputs({...inputs})

    signin({username,password})
    .then((data) =>{
      Object.entries(data).map(([key,value]) => {
        if(key==="EmailError"){
          setErrors({EmailError:value,PasswordError:""})
        }
        else if(key==="PasswordError"){
          setErrors({PasswordError:value,EmailError:""})
        }
        else if(key==="user"){
          localStorage.setItem('user',JSON.stringify(value))
          navigate('/');
        }
        return true;
      })
    })
  }

  return (
    <Base>
    <h2>Sign In</h2>
    <form className='was-validated' onSubmit={handleSubmit}>
      <div className="mt-3">
      <input className="form-control" type="email" id="email" value={username} onChange={handleInputs('username')} required />
      <div className="invalid-feedback">Please enter a valid email</div>
      {EmailError !== "" ?
      <div>{EmailError}</div>
      :""}
      </div>

      <div className="mt-3">
      <input className="form-control" type={showPassword ? "text" : "password"} id="password"
       value={password} onChange={handleInputs('password')} required/>

      <div className="invalid-feedback">Please fill out this field</div>
      {PasswordError !== "" ?
      <div className='text-danger'>{PasswordError}</div>
      :""}
      </div>

      <div className="mt-3 form-check form-switch">
        <input type="checkbox" onClick={handlePassword} className='form-check-input shadow-none'/> 
        <label className="form-check-label">Show Password</label>
      </div>
      
      <button className='mt-3 btn btn-primary mx-auto' type="submit">Login</button>
      
    </form>
    </Base>
  )
}

export default Signin;