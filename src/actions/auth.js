import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types'

import AuthService from "../services/auth.service"

export const register = (username, email, password) => (dispatch) =>{
    return AuthService.register(username, email, password).then(
        (respone) => {
            dispatch({
                type: REGISTER_SUCCESS
            })

            dispatch({
                type: SET_MESSAGE,
                payload: respone.data.message
            })

            return Promise.resolve()
        },
        (error) => {
            const message = 
            (error.respone &&
                error.respone.data &&
                error.respone.data.message) || 
                error.message || 
                error.toString();
            dispatch({
                type: REGISTER_FAIL
            })

            dispatch({
                type: SET_MESSAGE,
                payload: message
            })
            return Promise.reject();
        }
        
    )
}


export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data }
            })

            return Promise.resolve()
        },
        (error) => {
            const message = 
            (error.respone &&
                error.respone.data &&
                error.respone.data.message) ||
                error.message ||
                error.toString()

            dispatch({
                type: LOGIN_FAIL
            }) 

            dispatch({
                type: SET_MESSAGE,
                payload: message
            })

            return Promise.reject()
        }
    )
}

export const logout = () => (dispatch) =>{
    AuthService.logout()

    dispatch({
        type: LOGOUT
    })
}
