import React from 'react';

const Signin = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
      <h2>Instagram</h2>
      <input type="text" placeholder='email' />
      <input type="text" placeholder='password' />

      <button className="btn waves-effect waves-light signin-button blue lighten-2">
        Login
      </button>

      <h5> <a href='/signup'> Don't have an account? signup</a></h5>
    </div>
    </div>
  );
}

export default Signin;