import config  from '../../config';

export const CONSTANT = {
  CLOUDNAIRY          : config?.cloudnairy,
  SEARCH_USER         : `${config?.backendUrl}/search-users`,
  USER_WITH_ID        : `${config?.backendUrl}/user`,
  CREATE_POST         : `${config?.backendUrl}/create-post`,
  ALL_POST            : `${config?.backendUrl}/all-post`,
  LIKE                : `${config?.backendUrl}/like`,
  UNLIKE              : `${config?.backendUrl}/unlike`,
  COMMENT             : `${config?.backendUrl}/comment`,
  DELETE_POST         : `${config?.backendUrl}/delete-post`,
  NEW_PASSWORD        : `${config?.backendUrl}/new-password`,
  MY_POSTS            : `${config?.backendUrl}/my-posts`,
  UPDATE_PROFILE_PIC  : `${config?.backendUrl}/update-profile-pic`,
  RESET_PASSWORD      : `${config?.backendUrl}/reset-password`,
  SIGNIN              : `${config?.backendUrl}/signin`,
  SIGNUP              : `${config?.backendUrl}/signup`,
  ALL_FOLLOWINGS_POST : `${config?.backendUrl}/all-followings-post`,
  FOLLOW              : `${config?.backendUrl}/follow`,
  UNFOLLOW            : `${config?.backendUrl}/unfollow`,

}