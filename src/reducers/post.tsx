let posts: any[] = [];

export default function postReducer(state = posts, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload];
    default:
      return state;
  }
}