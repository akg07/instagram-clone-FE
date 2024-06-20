import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { post, postThirdParty } from '../../utils/router/Router';
import {CONSTANT} from '../../utils/constant/Constant';

const CreatePost =() => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  useEffect(() => {
    if(url) { // check is implemented cause useEffect works when componet mounts.
      post(CONSTANT.CREATE_POST, {title, body, pic: url})
      .then(data => {
        console.log(data);
        if(data.error) {
          M.toast({html: data.error, classes: '#c62828 red darken-3'});
        }else {
          M.toast({html: data.message, classes: '#43a047 green darken-1'});
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
    <div className='card input-field create-post'>
      <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="file-field input-field">
        <div className="btn blue darken-2">
          <span>Upload</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0]) } />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <button className="btn waves-effect waves-light signin-button blue darken-2" onClick={ () => postDetails() }>
        Submit Post
      </button>

    </div>
  );
}

export default CreatePost;