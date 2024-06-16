import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {

  const { state, dispatch } = useContext(UserContext);

  const renderList = () => {
    if(state) {
      return [
        <li key={'create'}><Link to="/create">Create Post</Link></li>,
        <li key={'profile'}><Link to="/profile">Profile</Link></li>
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