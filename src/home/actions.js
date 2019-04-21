import { push } from 'connected-react-router';

export function showLogin() {
    return dispatch => {
        dispatch(push('/login'));
    };
}
