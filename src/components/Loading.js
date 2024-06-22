import React from 'react'
import HashLoader from "react-spinners/HashLoader";

const Loading = ({show }) => {
  return show && (
    <div className='text-center p-4 loader-container'>
      <HashLoader color={'#64b5f6'} loading={show} size={50} />

    </div>
  )
}

export default Loading
