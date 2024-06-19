
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import config from '../../config';

const Reset = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetPassword = () => {

    fetch(`${config?.backendUrl}/reset-password`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    }).then((res => res.json()))
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: '#c62828 red darken-3'});
      }else{
        M.toast({html: `${data.message}`, classes: '#43a047 green darken-1'});
        navigate('/signin');
      }
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
      <h2>Instagram</h2>
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => resetPassword()}>
        Reset Password
      </button>
    </div>
    </div>
  );
}

export default Reset;