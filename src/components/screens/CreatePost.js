import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { post, postThirdParty } from '../../utils/router/Router';
import {CONSTANT} from '../../utils/constant/Constant';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';


const CreatePost =() => {

  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    if(url) { // check is implemented cause useEffect works when componet mounts.
      post(CONSTANT.CREATE_POST, {title, body, pic: url})
      .then(data => {
        if(data.error) {
          toast.error(data.error);
        }else {
          toast.success(data.message);
          navigate('/');
        }
      })
      .catch(err => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instagram-clone');
    data.append('cloud_name', 'dfcstdai1');

    postThirdParty(CONSTANT.CLOUDNAIRY, data)
    .then(data =>{
      if(data.url) setURL(data.url);
    })
    .catch(err => console.log(err));
  }

  return (
    <>
      { 
      state && 
      <div className="singup">
        <form>

          <div className="form-outline mb-4">
            <label className="form-label" >Title</label>
            <input type="text" placeholder='Title' className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}  />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" >Description</label>
            <input type="text" placeholder="Description" className="form-control" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>

          <div className="input-group mb-3">
            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0]) } />
          </div>

          <button type="button" className="btn btn-primary signinButton" onClick={ () => postDetails() } >Sign Up</button>

        </form>
      </div> 
      }
    </>
  );

  // return (
  //   <div className='card input-field create-post'>
  //     <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
  //     <input type="text" placeholder='body' value={title} onChange={(e) => setTitle(e.target.value)}  />

  //     <div className="file-field input-field">
  //       <div className="btn blue darken-2">
  //         <span>Upload</span>
  //         <input type="file" onChange={(e) => setImage(e.target.files[0]) } />
  //       </div>
  //       <div className="file-path-wrapper">
  //         <input className="file-path validate" type="text" />
  //       </div>
  //     </div>

  //     <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={ () => postDetails() }>
  //       Submit Post
  //     </button>

  //   </div>
  // );
}

export default CreatePost;