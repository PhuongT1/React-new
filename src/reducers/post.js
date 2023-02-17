let posts = [];

export default function postReducer(state = posts, action) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
}