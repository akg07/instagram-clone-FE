import React, { useState } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

const CreatePost =() => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setURL] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instagram-clone');
    data.append('cloud_name', 'dfcstdai1');

    fetch('https://api.cloudinary.com/v1_1/dfcstdai1/image/upload', {
      method: 'post',
      body: data
    })
    .then(res => res.json()) 
    .then(data =>{
      if(data.url) setURL(data.url);
    })
    .catch(err => console.log(err));

    fetch('/create-post', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        title, body, pic: url
      })
    }).then(res => res.json())
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