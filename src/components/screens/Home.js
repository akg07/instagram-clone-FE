import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Ayush gupta</h5>
        <div className="card-image">
          <img src='https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
          alt='' />
        </div>
        <div className="card-content">
          <h6>Title</h6>
          <p>body</p>
          <i class="material-icons">favorite</i>


          <input type='text' placeholder='add comment' />
        </div>
      </div>
    </div>
  );
}

export default Home;