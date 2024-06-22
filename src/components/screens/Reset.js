
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
    <>
      <div className="reset">
        <h1 className="logo">Sepiagram</h1>
        <form>
          <div className="form-outline mb-4">
            <label className="form-label" >Email address</label>
            <input type="email" placeholder="xyz@abc.com" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <button  type="button" className="btn btn-primary signinButton" onClick={() => resetPassword()} >Reset Password</button>
        </form>
      </div>
    </>
  );
}

export default Reset;