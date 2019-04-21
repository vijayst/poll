export default function messageReducer(state = {}, action) {
    switch (action.type) {
        case 'SET_MESSAGE':
            return action.payload;
        case 'CLEAR_MESSAGE':
            return {};
        default:
            return state;
    }
}
