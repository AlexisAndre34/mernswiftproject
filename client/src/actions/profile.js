import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: 'error profile', status: '404'}
        });
        
    }
}

//Create Update Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'profile Updated' : 'Profile Created'));

        if(!edit) {
            history.push('/dashboard');
        }

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: 'error profile', status: '404'}
        });

    }
}

export const updatePassword = (password) => async dispatch => {
    try {
        const config = {
            headers: {
                'Contente-Type': 'application/json'
            }
        }
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    
        const res = await axios.put('api/users/update-password', password, config); 
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'error updating password', status: '400' }
        });
    }
    
}

export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: 'error getting profile by id', status: '400' }
        });
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Etes vous sur ? Cette action sera définitive')) {
        try {
            await axios.delete('/api/profile');

            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETED
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: 'error deleting profile', status: '400'}
            });
        }
    }
};