import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
} from '../constants/userConstant'

// Login User
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .post(`http://localhost:8000/api/login`, {email, password} , config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register User
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .post(`http://localhost:8000/api/register`, { name, email, password }, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios
            .get(`http://localhost:8000/api/details`)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios
            .get(`http://localhost:8000/api/logout`)

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Profile
export const updateProfile = (name, email) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .put(`http://localhost:8000/api/details/update`, { name, email }, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios
            .put(`http://localhost:8000/api/password/update`, passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}