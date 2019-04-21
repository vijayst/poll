import firebase from '../util/firebase';
import { push } from 'connected-react-router';
import qs from 'qs';

export function register(email, password, displayName) {
    return async dispatch => {
        try {
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({
                displayName
            });
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'User is created' }
            });
            dispatch(push('/'));
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'Error in creating user', error: true }
            });
        }
    };
}

export function login(email, password) {
    return async (dispatch, getState) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            const query = getState().router.location.search;
            const { redirect } = qs.parse(query, { ignoreQueryPrefix: true });
            if (redirect) {
                dispatch(push(redirect));
            } else {
                dispatch(push('/'));
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'Error in login', error: true }
            });
        }
    };
}

export function updateProfile(displayName) {
    return async dispatch => {
        const user = firebase.auth().currentUser;
        await user.updateProfile({
            displayName
        });
        dispatch({
            type: 'SET_MESSAGE',
            payload: {
                text: 'Profile is updated'
            }
        });
    };
}

export function loginAsGoogle() {
    return async (dispatch, getState) => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            const query = getState().router.location.search;
            const { redirect } = qs.parse(query, { ignoreQueryPrefix: true });
            if (redirect) {
                dispatch(push(redirect));
            } else {
                dispatch(push('/'));
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'SET_MESSAGE',
                payload: { text: 'Error in login', error: true }
            });
        }
    };
}

export function getCurrentUser() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(currentUser => {
            dispatch({ type: 'SET_CURRENT_USER', payload: { currentUser } });
        });
    };
}
