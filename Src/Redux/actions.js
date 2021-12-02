import {
  CLEAR_STORAGE, CHAT_MESSAGES, SELECT_USER_ID
} from './types';

export const Clear_Storage = () => ({
  type: CLEAR_STORAGE
});


export const Store_Message = value => ({
  type: CHAT_MESSAGES,
  payload: value
});

export const Store_UserID = value => ({
  type: SELECT_USER_ID,
  payload: value
});

