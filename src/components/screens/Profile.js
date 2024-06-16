import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Profile = () => {

  const [myPics, setMyPics] = useState([]);
  const { state, dispatch} = useContext(UserContext);

  useEffect(() => {
    fetch('/my-posts', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then(result => {
      setMyPics(result.posts);
    })
  }, []);

  return (
    <div className='profile'>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '18px 0px', 
        borderBottom: '1px solid grey'
      }} >
        <div>
          <img style={{width: "160px", height:"160px", borderRadius: "80px" }} 
          src={state ? state.photo : '' } alt='state.name'
          />
        </div>
        <div>
          <h4>{state ? state.name : 'loading...'}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '110%'}}>
            <h6>{ myPics?.length} posts</h6>
            <h6>{ state?.followers?.length ? state.followers?.length : 0 } followers</h6>
            <h6>{ state?.followings?.length ? state.followings?.length : 0 } following</h6>
          </div>
        </div>
      </div>

      <div className='gallery'>
        {
          myPics.map(pic => {
            return(
              <img className='item' src={pic.photo} alt={pic.title} key={pic._id} />
            );

          })
        }

        
      </div>
    </div>
  );
}

export default Profile;