import React, {useContext, useRef, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';

const Navbar = () => {

  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, []);

  const renderList = () => {
    if(state) {
      return [
        <li key={'search'}><i data-target="modal1" className="large material-icons searchIcon modal-trigger">search</i></li>,
        <li key={'create'}><Link to="/create">Create Post</Link></li>,
        <li key={'profile'}><Link to="/profile">Profile</Link></li>,
        <li key={'my-followings-post'}><Link to="/my-followings-post">MyFeed</Link></li>,
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

    {/* Modal Structure */}
    <div id="modal1" className="modal searchModal" ref={searchModal}>
      <div className="modal-content">
        <input type="text" placeholder='Search user' value={search} onChange={(e) => {setSearch(e.target.value)}} />

        <ul className="collection">
          <li className="collection-item">Alvin</li>
          <li className="collection-item">Alvin</li>
          <li className="collection-item">Alvin</li>
          <li className="collection-item">Alvin</li>
        </ul>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;