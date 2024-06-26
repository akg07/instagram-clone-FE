import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { get, put } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';


const UserProfile = () => {
  
  const { userId } = useParams();
  const { state, dispatch} = useContext(UserContext);
  const [userProfile, setUserProfile] = useState([]);
  const [showFollow, setShowFollow] = useState( state ? !state.followings.includes(userId) : true);
  
  useEffect(() => {
    get(`${CONSTANT.USER_WITH_ID}/${userId}`)
    .then(result => {
      setUserProfile(result);
    })
    .catch((err) => console.log('user profile err: ', err))
  }, [userId]);

  const followUser = () => {
    put(CONSTANT.FOLLOW, {followId: userId})
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
    put(CONSTANT.UNFOLLOW, {unfollowId: userId})
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
      <div className='profile-container'>
      <div className='profile-data profile' >
        <div>
          <img className='profile-img'
          src={userProfile?.user?.photo}
          alt=''
          />
        </div>
        <div className='user-details-container'>
          <h4>{userProfile?.user?.name ? userProfile.user.name : 'loading...'}</h4>
          <div className='profile-details'>
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