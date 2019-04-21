export default function reducer(state = {}, action) {
    switch (action.type) {
        case 'SET_CURRENT_USER': {
            const { currentUser } = action.payload;
            const loggedIn = currentUser !== null;
            return {
                ...state,
                loggedIn,
                currentUser
            };
        }
        default:
            return state;
    }
}
