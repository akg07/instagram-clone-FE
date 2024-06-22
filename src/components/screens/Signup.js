import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css';
import {Link, useNavigate } from 'react-router-dom';
import { post, postThirdParty } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { UserContext } from '../../App';

const Signup = () => {

  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate ();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      navigate('/');
    }else{
      if(!(window.location.pathname === '/reset-password')) {
        navigate('/signup');
      }
    }
  }, [navigate])

  useEffect(() => {
    if(url) {
      signUp();
    }
  }, [url])

  const uploadImage = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instagram-clone');
    data.append('cloud_name', 'dfcstdai1');

    postThirdParty(CONSTANT.CLOUDNAIRY, data)
    .then(data =>{
      if(data.url) setURL(data.url);
    })
    .catch(err => console.log(err));
  }

  const signUp = () => {

    const body = { name, email, password }

    if(url) {
      body['photo'] = url
    }

    post(CONSTANT.SIGNUP, {body})
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: '#c62828 red darken-3'});
      }else {
        M.toast({html: data.message, classes: '#43a047 green darken-1'});
        navigate('/signin');
      }
    })
    .catch(err => console.log(err));
  }

  const postData = () => {

    if(image) {
      uploadImage();
    }else {
      signUp();
    }
  }

  return (
    <>
      {
        !state && 
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Sepiagram</h2>
            <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className="file-field input-field">
              <div className="btn blue darken-2">
                <span>Profile Image</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0]) } />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>

            <button className="btn waves-effect waves-light signin-button blue darken-2" 
                onClick={() => postData()}>
              Signup
            </button>
            <h5> <Link to="/signin"> Already have an account? Signin</Link> </h5>
          </div>
        </div>
      }
    </>
    
  );
}

export default Signup;