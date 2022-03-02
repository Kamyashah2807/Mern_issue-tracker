import axios from 'axios';
import {
    ALL_ISSUE_REQUEST,
    ALL_ISSUE_SUCCESS,
    ALL_ISSUE_FAIL,
    ISSUE_DETAILS_REQUEST,
    ISSUE_DETAILS_SUCCESS,
    ISSUE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/issueConstant'

export const getIssue = (currentPage = 1, status) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ISSUE_REQUEST
        })

        let link = `http://localhost:8000/api/all/issues?page=${currentPage}`

        if (status) {
            link = `http://localhost:8000/api/all/issues?page=${currentPage}&status=${status}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_ISSUE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ISSUE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getIssueDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ISSUE_DETAILS_REQUEST
        })

        const { data } = await axios.get(`http://localhost:8000/api/all/issues/${id}`)

        dispatch({
            type: ISSUE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ISSUE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
