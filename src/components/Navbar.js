import React, {useContext, useRef, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import { post } from '../utils/router/Router';
import {CONSTANT} from '../utils/constant/Constant';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  return(
    <>
      { state && 
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sepiagram</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* { renderList() } */}
              <li className="nav-item"> <Link className="nav-link active" aria-current="page" to="/create">Create Post</Link> </li>
              <li className="nav-item"> <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link> </li>
              <li className="nav-item"> <Link className="nav-link active" aria-current="page" to="/my-followings-post">MyFeed</Link> </li>
              <li className="nav-item"> <Link className="nav-link active" aria-current="page" to="/search-user">Search</Link> </li>
            </ul>

            <button className="btn btn-danger" type="submit" onClick={() => {
              localStorage.clear();
              dispatch({type: "CLEAR"});
              toast.success('Logged out successfully');
              navigate('/signin');
            }}>Logout</button>
          </div>
        </div>
      </nav>
      }
    </>
  );
}

export default Navbar;