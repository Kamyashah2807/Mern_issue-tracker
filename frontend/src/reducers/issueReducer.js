import {
    ALL_ISSUE_REQUEST,
    ALL_ISSUE_SUCCESS,
    ALL_ISSUE_FAIL,
    ISSUE_DETAILS_REQUEST,
    ISSUE_DETAILS_SUCCESS,
    ISSUE_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/issueConstant'

export const issueReducer = (state = { issues: [] }, action) => {
    switch (action.type) {
        case ALL_ISSUE_REQUEST:
            return {
                loading: true,
                issues: []
            }
        case ALL_ISSUE_SUCCESS:
            return {
                loading: false,
                issues: action.payload.issues,
                issueCount: action.payload.issueCount,
                resultPerPage: action.payload.resultPerPage,
            }
        case ALL_ISSUE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

export const issueDetailsReducer = (state = { issue: {} }, action) => {
    switch (action.type) {
        case ISSUE_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ISSUE_DETAILS_SUCCESS:
            return {
                loading: false,
                issue: action.payload.issue,
            }
        case ISSUE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}