import React, {useContext, useRef, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import { post } from '../utils/router/Router';
import {CONSTANT} from '../utils/constant/Constant';

const Navbar = () => {

  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
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
        <li key={'my-followings-post'}><Link to="/my-followings-post">MyFeed</Link></li>
      ]
    }
  }

  const fetchUsers = (query) => {
    setSearch(query);

    post(CONSTANT.SEARCH_USER, {query})
    .then(result => {
      setUserDetails(result.user);
    }).catch(err => console.log('search user: ', err));
  }

  const navigateToProfile = (_id) => {
    return state._id === _id ? `/profile` : `/profile/${_id}`;
  }

  const onUserClick = () => {
    M.Modal.getInstance(searchModal.current).close();
    setSearch(''); 
    setUserDetails([]);
  }

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
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search User" aria-label="Search" />
              <button className="btn btn-danger" type="submit" onClick={() => {
                localStorage.clear();
                dispatch({type: "CLEAR"});
                M.toast({html: `Logged out successfully`, classes: '#43a047 green darken-1'});
                navigate('/signin');
              }}>Logout</button>
            </form>
          </div>
        </div>
      </nav>
      }
    </>
  );

  // return (
  //   <nav>
  //   <div className="nav-wrapper white">
  //     <Link to={state ? "/" : "/signin"} className="brand-logo">Sepiagram</Link>
  //     <ul id="nav-mobile" className="right">
  //       { renderList() }
  //     </ul>
  //   </div>

  //   {/* Modal Structure */}
  //   <div id="modal1" className="modal searchModal" ref={searchModal}>
  //     <div className="modal-content">
  //       <input type="text" placeholder='Search user' value={search} onChange={(e) => {fetchUsers(e.target.value)}} />

  //       <ul className="collection">
  //         {userDetails.map((userDetail => {
  //           return <Link to={ navigateToProfile(userDetail._id) }
  //                       onClick={ () => { onUserClick() } }
  //                       key={userDetail._id} 
  //               >
  //                 <li className="collection-item">{userDetail.name}</li>
  //               </Link>
  //         }))}
  //       </ul>
  //     </div>
  //     <div className="modal-footer">
  //       <button className="modal-close waves-effect waves-green btn-flat" onClick={() => {setSearch(''); setUserDetails([]);}}>close</button>
  //     </div>
  //   </div>
  // </nav>
  // );
}

export default Navbar;