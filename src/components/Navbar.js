import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {

  const { state, dispatch } = useContext(UserContext);

  const renderList = () => {
    if(state) {
      return [
        <li><Link to="/create">Create Post</Link></li>,
        <li><Link to="/profile">Profile</Link></li>
      ]
    }else {
      return [
        <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
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