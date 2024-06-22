import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';
import { post } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';

const Signin = () => {

  const { state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      navigate('/');
    }else{
      if(!(window.location.pathname === '/reset-password')) {
        navigate('/signin');
      }
    }
  }, [navigate])

  const login = () => {

    post(CONSTANT.SIGNIN, {email, password})
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: '#c62828 red darken-3'});
      }else{
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({type: 'USER', payload: data.user})
        M.toast({html: `${data.user.name} ${data.message}`, classes: '#43a047 green darken-1'});
        navigate('/');
      }
    })
  }

  return (
    <>
      { !state && <div className="mycard">
        <div className="card auth-card input-field">
          <h2>Sepiagram</h2>
          <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => login()}> Login </button>

          <h6> <Link to='/signup'> Don't have an account? signup</Link></h6>
          <p> <Link to='/reset-password'> forgot password?</Link></p>
      </div>
    </div>}
    </>
  );
}

export default Signin;