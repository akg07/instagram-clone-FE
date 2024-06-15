import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css';

const Signin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    fetch('/signin', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    }).then((res => res.json()))
    .then(data => {
      console.log(data);
      if(data.error) {
        M.toast({html: data.error, classes: '#c62828 red darken-3'});
      }else{
        M.toast({html: `${data.user.name} ${data.message}`, classes: '#43a047 green darken-1'});
        navigate('/');

      }
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
      <h2>Instagram</h2>
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => login()}>
        Login
      </button>

      <h5> <a href='/signup'> Don't have an account? signup</a></h5>
    </div>
    </div>
  );
}

export default Signin;