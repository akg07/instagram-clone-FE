import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../App';
import { get, postThirdParty, put } from '../../utils/router/Router'; 
import { CONSTANT } from '../../utils/constant/Constant';

const Profile = () => {

  const [myPics, setMyPics] = useState([]);
  const [image, setImage] = useState("");
  const { state, dispatch} = useContext(UserContext);
  const imageRef = useRef(null);

  useEffect(() => {
    get(CONSTANT.MY_POSTS)
    .then(result => {
      setMyPics(result.posts);
    })
  }, []);

  useEffect(()=> {
    if(image) {
      updateProfilePic();
    }
  }, [image]);

  const updateProfilePic = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instagram-clone');
    data.append('cloud_name', 'dfcstdai1');

    postThirdParty(CONSTANT.CLOUDNAIRY, data)
    .then(data =>{
      if(data.url) {
        dispatch({type:'UPDATE_PIC', payload: data.url});
        uploadToDB(data.url);
      }
    })
    .catch(err => console.log(err));
  }

  const uploadToDB = (photo) => {

    const payload = {
      userId: state?._id,
      photo: photo
    }

    put(CONSTANT.UPDATE_PROFILE_PIC, payload)
    .then(result => {
      const updatedPhoto = result?.result?.photo;
      localStorage.setItem('user', JSON.stringify({...state, photo: updatedPhoto}));
      dispatch({type:'UPDATE_PIC', payload: updatedPhoto});
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleImageClick = () => {
    imageRef.current.click()
  }

  const handleImageChanges = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <div className='profile-container'>
      <div className='profile'>
        <div className='profile-data' >
          <div className='profile-img-container' onClick={handleImageClick}>
            <img className='profile-img' src={state ? state.photo : '' } alt='state.name' />
            <div className="overlay">Upload</div>
            <input className='profile-update' type="file" ref={imageRef} onChange={(e) => {handleImageChanges(e)}}/>
          </div>
        
          <div className='profile-details-container'>
            <h4>{state ? state.name : 'loading...'}</h4>
            <div className='profile-details' >
              <h6>{ myPics?.length} posts</h6>
              <h6>{ state?.followers?.length ? state.followers?.length : 0 } followers</h6>
              <h6>{ state?.followings?.length ? state.followings?.length : 0 } following</h6>
            </div>
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