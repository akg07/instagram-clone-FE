import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { get, postThirdParty, put } from '../../utils/router/Router'; 
import { CONSTANT } from '../../utils/constant/Constant';

const Profile = () => {

  const [myPics, setMyPics] = useState([]);
  const [image, setImage] = useState("");
  const { state, dispatch} = useContext(UserContext);

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

  return (
    <div className='profile'>
      <div style={{
        margin: '18px 0px', 
        borderBottom: '1px solid grey'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
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
        {/* <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={() => {updateProfilePic()}} style={{ 
          margin: "10px 0px 10px 171px"
        }}>
          Update Pic
        </button> */}
        <div className="file-field input-field">
          <div className="btn blue darken-2">
            <span>Upload</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0]) } />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
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