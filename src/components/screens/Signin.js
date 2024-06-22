import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { post } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { toast } from 'react-toastify';

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
        toast.error(data.error);
      }else{
        localStorage.setItem('jwt', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({type: 'USER', payload: data.user})
        toast.success(`${data.user.name} ${data.message}`);
        navigate('/');
      }
    }).catch(err => {
      console.log('signin error', err);
      toast('something went wrong');
    })
  }

  return(
    <>
      { !state && <div className="login">
        <h1 className="logo">Sepiagram</h1>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" >Email address</label>
            <input type="email" placeholder="xyz@abc.com" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" >Password</label>
            <input type="password" placeholder='q2345344546' className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="row mb-4">
            {/* <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                <label className="form-check-label" for="form2Example31"> Remember me </label>
              </div>
            </div> */}

            <div className="col">
              <Link to="/reset-password">Forgot password?</Link>
            </div>
          </div>

          <button  type="button" className="btn btn-primary signinButton" onClick={() => login()} >Sign in</button>

          <div className="text-center">
            <p>Not a member? <Link to="/signup">SignUp</Link></p>
            {/* <p>or sign up with:</p>
            <button  type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button> 
            
            <button  type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button  type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button  type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button> */}
          </div>
        </form>
      </div>
      }
    </>
  );
}

export default Signin;