import React, { useState } from 'react';
import { post } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewPassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordMatch = () => {
    return confirmPassword.length > 0 && password===confirmPassword;
  }

  const updatePassword = () => {

    post(CONSTANT.NEW_PASSWORD, {newpass:password,token})
    .then(data => {
      if(data.error) {
        toast.error(data.error);
      }else{
        toast.success(data.message);
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
            <label className="form-label" >Password</label>
            <input type="text" placeholder="Enter password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <div className="form-outline mb-4">
            <label className="form-label" >Confirm Password { isPasswordMatch() && <FaCheckCircle className='match-pass-feedback'/> } </label>
            <input type="password" placeholder="Confirm password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          
          <button type="button" className="btn btn-primary reset-password-btn" onClick={() => updatePassword()} >Update password</button>
        </form>
      </div>
    </>
  );
}

export default NewPassword;