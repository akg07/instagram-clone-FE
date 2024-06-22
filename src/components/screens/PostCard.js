import React, { useContext } from 'react'
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { put } from '../../utils/router/Router';
import { CONSTANT } from '../../utils/constant/Constant';

const PostCard = (props) => {
  console.log(props);
  const { state, dispatch } = useContext(UserContext)
  const post = props.post;


  const getUser = (postData) => {
    return postData.postedBy._id === state._id ? '/profile' : `/profile/${postData.postedBy._id}`
  }

  const comment = (postId, text) => {
    put(CONSTANT.COMMENT, {postId, text})
    .then(result => {
      // const newData = data.map(item => {
      //   if(item._id === result.data._id) {
      //     return result.data;
      //   }else return item;
      // });
      // setData(newData);
    })
    .catch(err => console.log(err));
  }

  const data = {
    "_id": "666ec9c334618158dbf98af1",
    "title": "Chopper",
    "body": "Is not he cute?.",
    "photo": "http://res.cloudinary.com/dfcstdai1/image/upload/v1718536641/nzzmquk8maofpyxnyzi7.jpg",
    "postedBy": {
        "_id": "666d908e296951060ff4c1a4",
        "name": "Saloni gupta"
    },
    "__v": 0,
    "likes": [
        "666d908e296951060ff4c1a4"
    ],
    "comments": [
        {
            "text": "He is handsome",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "666ed7a5623678a7f9e432fb"
        },
        {
            "text": "asdasda",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "666f38f39c498bc53606e8a8"
        },
        {
            "text": "cxvvxcvxcv",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "666f3a789c498bc53606e967"
        },
        {
            "text": "sdfsdfsds",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "666f3adb2f6b688c50060626"
        },
        {
            "text": "Chfg",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "6671f40a36e4c38789a2c0ff"
        },
        {
            "text": "Chopper looks handsome",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "66745abaeda5bd991ca08b2c"
        },
        {
            "text": "comment",
            "postedBy": {
                "_id": "666d8e32f932fb25741e0578",
                "name": "ayush k gupta"
            },
            "_id": "66772dca02b300db1269fc0b"
        }
    ],
    "updatedAt": "2024-06-22T20:02:18.823Z"
  }
  return (
    <>
      <div className="post-container">
        <div className="container">
          <div className="post-box">
              <div className="post-box-header">
                  <img src={post.postedBy.photo} alt="Profile Picture" className="profile-pic" />
                  <div className="profile-info">
                      <Link className="username" to={ getUser(post) }>{post.postedBy.name}</Link>
                      {/* <span className="location">Location 1</span> */}
                  </div>
                  {/* <div className="options">...</div> */}
              </div>
              <img src={post.photo} alt="Post Image" className="post-image" />
              <div className="post-box-footer">
                  <div className="actions">
                      <span className="like">❤️</span>
                      <span className="comment">💬</span>
                      <span className="share">🔗</span>
                  </div>
                  <span className="likes">{post.likes.length} likes</span>
                  
                  <div className="caption">
                      <span className="username">{post.postedBy.name}</span> {post.body}
                  </div>

                  <div className="comments">
                    {
                      post.comments.map(comment => {
                        return(
                          <div className="comment">
                            <span className="username">{comment.postedBy.name}</span> {comment.text}
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className="add-comment">
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target[0].value)
                      }}>
                        <input type="text" placeholder="Add a comment..." className="comment-input" />
                      </form>
                      {/* <button className="comment-btn" onClick={(e) => {
                        console.log(e.target.value);
                      }} >comment</button> */}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard
