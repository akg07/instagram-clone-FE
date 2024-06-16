import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

const SubscribedUserPost = () => {

  const { state, dispatch } = useContext(UserContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/all-followings-post', {
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

  const deletePost = (postId) => {

    fetch(`/delete-post/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      const newData = data.filter(post => post._id != result.data._id);
      setData(newData);
      M.toast({html: 'Post delete successfully', classes: '#43a047 green darken-1'})
    })
  }

  const getUser = (post) => {
    return post.postedBy._id === state._id ? '/profile' : `/profile/${post.postedBy._id}`
  }

  return (
    <div className="home">
      {
        data.map(post => {
          return (
            <div className="card home-card" key={post._id}>
              <h5>
                <Link to={ getUser(post) } className='name'>{ post.postedBy.name }</Link>
                {
                  post.postedBy._id === state._id ? <i className="material-icons" onClick={ () => deletePost(post._id) } style={{float:'right'}}>delete</i> : ''
                }
              </h5>
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

export default SubscribedUserPost;