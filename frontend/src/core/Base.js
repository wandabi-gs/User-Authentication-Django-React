import React, {useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import {Link, useNavigate} from 'react-router-dom';
import { signout,is_authenticated } from '../user/Authentication';
import { BACKEND_URL } from '../backend';
import { User } from '../user/SessionData';

function Base(props) {
  const user = User();

  let navigate = useNavigate();
  
    useEffect(() =>{
       is_authenticated();
    })
  return (
    <div>
        <div style={{height:"70px"}} className="container-fluid d-flex flex-row-reverse  bg-success pt-2">
            <div className="btn-group">
                <Link to="/" className="btn nav-item shadow-none">Home</Link>
                {!is_authenticated() ?
                <Fragment>
                <Link to="/Signin" className="btn nav-item shadow-none">Sign In</Link>
                <Link to="/Signup" className="btn nav-item shadow-none">Sign Up</Link>
                </Fragment>
                :
                <Fragment>
                <div className="nav-item-dropdown">
                <Link to="" className="btn dropdown-toggle shadow-none" data-bs-toggle="dropdown">Account</Link>
                <div className="dropdown-menu">
                    <Link to="/Profile" className="dropdown-item">Profile</Link>
                    <Link to="" className="dropdown-item" onClick={() => {
                      signout();
                      navigate('/')
                    }}>Logout</Link>
                    <Link className="dropdown-item" to="/ChangePassword">Change Password</Link>
                    <Link to="/DeleteAccount" className="dropdown-item">Delete Account</Link>
                </div>
                </div>
                </Fragment>
                }
            </div>
            {is_authenticated() ?
        <div className="navbar-brand flex-grow-1">
        <Link to="/ChangePicture">
      <img width={"50px"} height={"50px"} src={`${BACKEND_URL}${user['image']}`} className="rounded-circle"  alt="" />
      </Link>
      </div>
      :""
         }
        </div>
        <div className="container container-sm box-shadow border mt-3">{props.children}</div>

    </div>
  )
}

export default Base