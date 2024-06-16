import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';

const Navbar = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const renderList = () => {
    if(state) {
      return [
        <li key={'create'}><Link to="/create">Create Post</Link></li>,
        <li key={'profile'}><Link to="/profile">Profile</Link></li>,
        <button className="btn #c62828 red darken-3" onClick={() => {
          localStorage.clear();
          dispatch({type: "CLEAR"});
          M.toast({html: `Logged out successfully`, classes: '#43a047 green darken-1'});
          navigate('/signin');
        }} key={'logout'}>
          Logout
        </button>
      ]
    }else {
      return [
        <li key={'signin'}><Link to="/signin">Signin</Link></li>,
        <li key={'signup'}><Link to="/signup">SignUp</Link></li>
      ]
    }
  }

  return (
    <nav>
    <div className="nav-wrapper white">
      <Link to={state ? "/" : "/signin"} className="brand-logo">Instagram</Link>
      <ul id="nav-mobile" className="right">
        { renderList() }
      </ul>
    </div>
  </nav>
  );
}

export default Navbar;