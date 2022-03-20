import React, { useState } from 'react';
import Base from '../core/Base';
import { changepicture } from './Authentication';
import { User } from './SessionData';
import { BACKEND_URL } from '../backend';

function ChangePicture() {
  const [new_image,setImage] = useState('null')
  const user = User();
  const handleImage = (event) => {
    setImage(event.target.files[0])
  }

  const handleSubmit = (event) => {
    let email = user['email'];
    event.preventDefault();
    changepicture({email,new_image},user['session_token'])
  }

  return (
    <Base>
    <div className="mx-auto m-3" style={{width:"400px",height:"400px"}}>
      <img width={"400px"} height={"400px"} src={`${BACKEND_URL}${user['image']}`} className="rounded-circle"  alt="" />
    </div>
    <form className="was-validated" onSubmit={handleSubmit}>
      <div className="mt-3">
      <label className="form-label">Change profile picture</label>
      </div>

      <div className="mt-3">
        <input type="file" id="new_image" onChange={handleImage} className="form-control" required/>
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-primary">Upload</button>
      </div>
    </form>
    </Base>
  )
}

export default ChangePicture;