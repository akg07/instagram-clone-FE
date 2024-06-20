
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { post } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';

const Reset = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetPassword = () => {

    post(CONSTANT.RESET_PASSWORD, {email})
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