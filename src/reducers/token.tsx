import { Token } from 'services/token.service'

let token = {}

export default function tokenInfor(
  state = token,
  action: { type: string; data: Token }
) {
  switch (action.type) {
    case 'saveToken':
      return { ...state, ...action.data }
    default:
      return state
  }
}
