import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';


const UserProfile = () => {
  
  const { userId } = useParams();
  const { state, dispatch} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);
  const [showFollow, setShowFollow] = useState( state ? !state.followings.includes(userId) : true);
  
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

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        followId: userId
      })
    })
    .then(res => res.json())
    .then(result => {
      const {followings, followers} = result.user;
      dispatch({type: 'UPDATE', payload: {followings, followers}});
      localStorage.setItem("user", JSON.stringify(result.user));
      setUserProfile((prevState) => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, result._id],
          }
        }
      });
      
      setShowFollow(false);
    })
    .catch(err => {
      console.log(err);
    });
  }

  const unfollowUser = () => {
    fetch('/unfollow', {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        unfollowId: userId
      })
    })
    .then(res => res.json())
    .then(result => {
      const {followings, followers} = result.user;
      dispatch({type: 'UPDATE', payload: {followings, followers}});
      localStorage.setItem("user", JSON.stringify(result.user));
      setUserProfile((prevState) => {
        let newFollowes = prevState.user.followers.filter(item => item !== result.user._id);
        newFollowes = newFollowes.filter(item => item!==undefined);
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollowes,
          }
        }
      });
      setShowFollow(true);
    })
    .catch(err => {
      console.log(err);
    });
  }

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
            <h6>{userProfile?.posts?.length ? userProfile?.posts?.length : 0} posts</h6>
            <h6>{userProfile?.user?.followers?.length ? userProfile?.user.followers?.length : 0} followers</h6>
            <h6>{userProfile?.user?.followings?.length ? userProfile?.user.followings?.length : 0} following</h6>
          </div>
          {
          showFollow ? <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => followUser()}>
            Follow
          </button> : 
          <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => unfollowUser()}>
            Unfollow
          </button>
          }
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