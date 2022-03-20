import React,{ useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from './Authentication';

function Signup() {
  let navigate = useNavigate();
  //Handle password values and errors
  const [showPassword,setShowPassword] = useState(false)
  const handlePasswordVisible = () => {
    setShowPassword(!showPassword)
  }
  const [password,setPassword] = useState('');
  const [password_length_error,setPasswordLengthError] = useState('');

  const handlePassword = (event) => {
    setPassword(event.target.value)
    if(event.target.value.length < 7){
      setPasswordLengthError('Password should have atleast 8 charcters')
    }
    else{
      setPasswordLengthError('')
    }
  }

  const [confirm_password,setCpassword] = useState('');
  const [password_match_error,matchPassword] = useState('');
  const passwordMatch = (event) => {
    setCpassword(event.target.value);
    if(event.target.value !== password){
      matchPassword('Your passwords should match')
    }
    else if(event.target.value === password){
      matchPassword('');
    }
  }

  //handling input values
  const [inputs,setInputs] = useState({
    first_name : "",
    last_name : "",
    email : "",
    gender : "Female"
  })
  const {first_name,last_name,email,gender} = inputs;
  const handleInputs = (name) => (event) => {
    setInputs({...inputs,[name]:event.target.value})
  }

  const[image,setImage] = useState('null')
  const handleImage = (event) => {
    setImage(event.target.files[0])
  }

  //handling errors in submission
  const [email_error,setEmail_error] = useState('')
  
  //handling the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if(first_name.length>0 && last_name.length>0 && email.length>0 && password.length>7 && password===confirm_password){ 
    signup({first_name,last_name,email,image,gender,password})
    .then((data) => {
      Object.entries(data).map(([key,value]) => {
         if(key==="email_error"){
          setEmail_error(value);
        }
        else if(key==='success'){
           navigate('/Signin');
        }
        return false;
      })
    })
  }
}

  return (
    <Base>
    <h2>Sign Up</h2>
    <form className="was-validated" onSubmit={handleSubmit}>
      <div className="mt-3">
        <input type="text" id="first_name" value={first_name} onChange={handleInputs('first_name')} placeholder='First Name' className="form-control" required/>
        <div className="invalid-feedback">Please fill out this field</div>
      </div>

      <div className="mt-3">
        <input type="text" id="last_name" value={last_name} onChange={handleInputs('last_name')} placeholder='Last Name' className="form-control" required/>
        <div className="invalid-feedback">Please fill out this field</div>
      </div>

      <div className="mt-3">
        <input type="email" id="email" value={email} onChange={handleInputs('email')} placeholder='Email' className="form-control" required/>
        {email_error !=="" ?
        <div className="invalid-feedback">{email_error}</div>
        :<div className="invalid-feedback">Please enter a valid email</div>}
      </div>
      <div className="mt-3">
        <select value={gender} onChange={handleInputs('gender')} id="gender" className="form-select">
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      <div className="mt-3">
        <label className="form-label">Upload profile picture</label>
        <input type="file" id="image" onChange={handleImage}/>
      </div>
      <div className="mt-3">
        <input type={showPassword ? "text" : "password" } id="password" value={password} onChange={handlePassword} minLength={8} placeholder='Password' className="form-control" required/>
        {password_length_error !=="" ?
        <div className="invalid-feedback">{password_length_error}</div>
        :<div className="invalid-feedback">Please enter a password of at least 8 characters</div>}
      </div>

      <div className="mt-3">
        <input type={showPassword ? "text" : "password" } value={confirm_password} onChange={passwordMatch} id="confirm_password" minLength={8} placeholder='Re-enter Password' className="form-control" required/>
        {password_match_error !== "" ?
        <div className="text-danger">{password_match_error}</div>
        :""}
      </div>

      <div className="mt-3 form-check form-switch">
        <input type="checkbox" className="form-check-input shadow-none" onClick={handlePasswordVisible}/> <label className="form-check-label">Show password</label>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary shadow-none">Create Account</button>
      </div>

    </form>
    </Base>
  )
}

export default Signup;