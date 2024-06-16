import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Home = () => {

  const { state, dispatch } = useContext(UserContext)
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

  const likePost = (postId) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId
      })
    })
    .then(res => res.json())
    .then(result => {
      const newData = data.map(item => {
        if(item._id === result.data._id) {
          return result.data;
        }else return item;
      });
      setData(newData);
    })
    .catch(err => console.log(err));
  }

  const unlikePost = (postId) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId
      })
    })
    .then(res => res.json())
    .then(result => {
      const newData = data.map(item => {
        if(item._id === result.data._id) {
          return result.data;
        }else return item;
      });
      setData(newData);
    })
    .catch(err => console.log(err));
  }

  const comment = (postId, text) => {
    fetch('/comment', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        postId,
        text
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.map(item => {
        if(item._id === result.data._id) {
          return result.data;
        }else return item;
      });
      setData(newData);
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="home">
      {
        data.map(post => {
          return (
            <div className="card home-card" key={post._id}>
              <h5>{post.postedBy.name}</h5>
              <div className="card-image">
                <img src={post.photo} alt={post.title} />
              </div>
              <div className="card-content">
                <h6>{post.title}</h6>
                <p>{post.body}</p>
                <h6>{post.likes.length} likes</h6>
                {/* <i className="material-icons">favorite</i> */}

                {
                  post.comments.map(comment => {
                    return (
                      <h6 key={comment._id}>
                        <span style={{fontWeight: '500'}}> { comment.postedBy.name }</span> 
                        { comment.text }
                      </h6>
                    );
                  })
                }

                {
                  post.likes.includes(state._id) ? 
                  <i className="material-icons" onClick={ () => unlikePost(post._id) }>thumb_down</i> :
                  <i className="material-icons" onClick={ () => likePost(post._id) }>thumb_up</i>
                }

                <form onSubmit={(e) => {
                  e.preventDefault();
                  comment(post._id, e.target[0].value);
                  e.target[0].value = "";
                }}>
                  <input type='text' placeholder='add comment' />
                </form>
              </div>
            </div>
          )
        })
      }
      
    </div>
  );
}

export default Home;