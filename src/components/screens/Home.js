import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { get, put,deleteWithparams } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';
import { toast } from 'react-toastify';
import PostCard from './PostCard';
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



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

  return data.map(post => {
    return (
      <div className="post-container" key={post._id}>
        <div className="container">
          <div className="post-box">
              <div className="post-box-header">
                  <img src={post.postedBy.photo} alt="Profile Picture" className="profile-pic" />
                  <div className="profile-info">
                      <Link className="username" to={ getUser(post) }>{post.postedBy.name}</Link>
                      {/* <span className="location">Location 1</span> */}
                  </div>

                  {
                    post.postedBy._id === state?._id ? 
                    <div className="options">
                      <MdDelete onClick={ () => deletePost(post._id) }></MdDelete>
                    </div>
                    : ''

                  }
              </div>
              <img src={post.photo} alt="Post Image" className="post-image" />
              <div className="post-box-footer">
                  <div className="actions">
                      <span className="like">
                        {
                          post.likes.includes(state._id) ? 
                          <FaHeart className='liked-icon' onClick={ () => unlikePost(post._id) }> </FaHeart > : 
                          <FaRegHeart className='unliked-icon' onClick={ () => likePost(post._id) } > </FaRegHeart > 
                        }
                      </span>
                      {/* <span className="comment">💬</span>
                      <span className="share">🔗</span> */}
                  </div>
                  <span className="likes">{post.likes.length} likes</span>
                  
                  <div className="caption">
                      <span className="username">{post.postedBy.name}</span> {post.body}
                  </div>

                  <div className="comments">
                    {
                      post.comments.map(comment => {
                        return(
                          <div className="comment" key={comment._id}>
                            <span className="username">{comment.postedBy.name}</span> {comment.text}
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className="add-comment">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        comment(post._id, e.target[0].value);
                        e.target[0].value = "";
                      }}>
                        <input type="text" placeholder="Add a comment..." className="comment-input" />
                      </form>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  });
}

export default Home;