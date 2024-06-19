import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import M from 'materialize-css';
import config from '../../config';

const NewPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const updatePassword = () => {

    fetch(`${config?.backendUrl}/new-password`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        newpass:password,
        token
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
      <input type="password" placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => updatePassword()}>
        Update password
      </button>

      <h5> <Link to='/signup'> Don't have an account? signup</Link></h5>
    </div>
    </div>
  );
}

export default NewPassword;