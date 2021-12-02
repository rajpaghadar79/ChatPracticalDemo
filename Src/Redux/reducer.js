import {
  CLEAR_STORAGE, CHAT_MESSAGES, SELECT_USER_ID
} from './types'

const RajImage = require('../assets/raj.png');
const AjayImage = require('../assets/ajay.jpg');

const initialState = {

  Messages: [],
  SelectedUserId: 1,
  Users: [
    {
      Id: 1,
      FirstName: "Ajay",
      LastName: "Sony",
      Email: "ajaysony@gmail.com",
      ProfileImage: AjayImage,
    },
    {
      Id: 2,
      FirstName: "Raj",
      LastName: "Patel",
      Email: "rajpatel@gmail.com",
      ProfileImage: RajImage,
    }
  ]

};

const Reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_STORAGE:
      return { ...state, ...initialState };

    case CHAT_MESSAGES:
      return { ...state, Messages: action.payload };

    case SELECT_USER_ID:
      return { ...state, SelectedUserId: action.payload };


    default:
      return { ...state };
  }
};

export default Reducer;