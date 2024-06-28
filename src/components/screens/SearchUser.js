import React, { useContext, useState } from 'react'
import { post } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const SearchUser = () => {

  const [username, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [ timeOutId, setTimeOutId ] = useState(null);

  const fetchUser = () => {
    // console.log(username)
    // setUserName(username);

    if(username.length === 0) {
      setUserDetails([]);
      return;
    }

    post(CONSTANT.SEARCH_USER, {query: username})
    .then(result => {
      if(result.user.length > 0) {
        setUserDetails(result.user);
      }else {
        setUserDetails([]);
      }
    }).catch(err => console.log('search user: ', err));
  }

  const navigateToProfile = (_id) => {
    return state._id === _id ? `/profile` : `/profile/${_id}`;
  }

  const onUserClick = () => {
    setUserName("");
    setUserDetails([]);
  }

  const handleInput = (e) => {
    const value = e.target.value;
    setUserName(value);

    if(timeOutId) {
      clearTimeout(timeOutId);
    }

    const newTimeOutId = setTimeout(() => {
      fetchUser();
    }, 1500);

    setTimeOutId(newTimeOutId);
  }

  return (
    <>
      <div className="search">
        <div className="search-container">
          <div className='search-box'>
            <input className='search-inp' type="text" placeholder='Enter user name' value={username} onChange={handleInput } />
            {/* <button className="btn btn-primary search-btn" onClick={() => fetchUser()}> Search User</button> */}
          </div>
          <div className="user-list">
            {
              userDetails.length > 0 ? userDetails.map((userDetails, index) => (
                <Link className='noUL' to={ navigateToProfile(userDetails._id) } key={ index } >
                  <li className='user-content'>
                    <img src={userDetails.photo} alt="user-img" className='profile-pic' />
                    <span className='user-name'>{userDetails.name}</span>
                  </li>
                </Link>
              )) : 'No user found.'
            }
            
          </div>
        </div>
      </div>

    </>
  )
}

export default SearchUser
