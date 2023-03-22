let posts: string[] = []

export default function postReducer(
  state = posts,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.payload]
    default:
      return state
  }
}
