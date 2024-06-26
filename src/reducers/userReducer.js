export const initialState = null;

export const reducer = (state, action) => {

  if(action.type === 'USER') {
    return action.payload;
  }
  else if(action.type === 'CLEAR') {
    return null;
  }
  else if(action.type === 'UPDATE') {
    return {
      ...state,
      followers: action.payload.followers,
      followings: action.payload.followings,
    }
  }
  else if(action.type === 'UPDATE_PIC') {
    return {
      ...state,
      photo: action.payload
    }
  }
  else {
    return state;
  }
}