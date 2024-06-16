import React, { useState, useEffect } from 'react';

const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/all-post', {
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': "application/json"
      },
      method: 'get'
    })
    .then(res => res.json())
    .then(result => {
      setData(result.posts);
    })
  }, []);

  return (
    <div className="home">
      {
        data.map(post => {
          return (
            <div className="card home-card" key={post._id}>
              <h5>{post.postedBy.name}</h5>
              <div className="card-image">
                <img src={post.photo} alt='image' />
              </div>
              <div className="card-content">
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <i className="material-icons">favorite</i>

                <input type='text' placeholder='add comment' />
              </div>
            </div>
          )
        })
      }
      
    </div>
  );
}

export default Home;