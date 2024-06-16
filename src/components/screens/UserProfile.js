import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const UserProfile = () => {

  const [userProfile, setUserProfile] = useState([]);
  const { userId } = useParams();
  
  useEffect(() => {
    fetch(`/user/${userId}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then(result => {
      setUserProfile(result);
    })
  }, []);

  return (
    <>
    {userProfile ? 
      <div className='profile'>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '18px 0px', 
        borderBottom: '1px solid grey'
      }} >
        <div>
          <img style={{width: "160px", height:"160px", borderRadius: "80px" }} 
          src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          />
        </div>
        <div>
          <h4>{userProfile?.user?.name ? userProfile.user.name : 'loading...'}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '110%'}}>
            <h6>{userProfile?.posts?.length} posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>

      <div className='gallery'>
        {
          userProfile?.posts?.length > 0 ?
          userProfile?.posts.map(pic => {
            return(
              <img className='item' src={pic.photo} alt={pic.title} key={pic._id} />
            );

          })
          : <h5>No post!!</h5>
        }
      </div>
    </div>
    : <h2>loading...</h2>}
    
    </>
  );
}

export default UserProfile;