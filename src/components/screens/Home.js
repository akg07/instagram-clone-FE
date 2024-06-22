import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { get, put,deleteWithparams } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { toast } from 'react-toastify';


const Home = () => {

  const { state, dispatch } = useContext(UserContext)
  const [data, setData] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('jwt')) {
      get(CONSTANT.ALL_POST)
      .then(result => {
        setData(result.posts);
      })
    }
  }, []);

  const likePost = (postId) => {
    put(CONSTANT.LIKE, {postId})
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
    put(CONSTANT.UNLIKE, {postId})
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
    put(CONSTANT.COMMENT, {postId, text})
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

  const deletePost = (postId) => {

    deleteWithparams(CONSTANT.DELETE_POST, postId)
    .then(result => {
      const newData = data.filter(post => post._id !== result.data._id);
      setData(newData);
      toast.success('Post delete successfully')
    })
  }

  const getUser = (post) => {
    return post.postedBy._id === state._id ? '/profile' : `/profile/${post.postedBy._id}`
  }

  return (
    <div className="home">
      {
        data?.map(post => {
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

export default Home;