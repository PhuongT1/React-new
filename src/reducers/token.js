let token = {};

export default function tokenInfor(state = token, action) {
    switch (action.type) {
        case 'saveToken':
        return {...state, ...action.data};
        default:
        return state;
    }
}