import React, { useState } from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const Signup = () => {

  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    fetch('/signup', {
      method: 'post', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: '#c62828 red darken-3'});
      }else {
        M.toast({html: data.message, classes: '#43a047 green darken-1'});
        history.push('/signin');
      }
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
      <h2>Instagram</h2>
      <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="btn waves-effect waves-light signin-button blue darken-2" 
          onClick={() => postData()}>
        Signup
      </button>
      <h5> <a href="/signin"> Already have an account? Signin</a> </h5>
    </div>
    </div>
  );
}

export default Signup;