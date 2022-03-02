import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import './Home.css'
import MetaData from '../layout/MetaData';
import { clearErrors, getIssue } from '../../actions/issueAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'
import Issue from './Issue.js';

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const { error, issues } = useSelector(state => state.issues)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getIssue());
    }, [dispatch, error, alert])

    return (
            <Fragment>
            <MetaData title="ISSUE TRACKER" />
            <div className='banner'>
                <p>Welcome to Issue-Tracker</p>
                <h1>FIND AMAZING ISSUES BELOW</h1>

                <a href='#container'>
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Issues</h2>
            <div className='container' id="container">
                {issues && issues.map(issue => (
                    <Issue key={issue._id} issue={issue} />
                ))}

            </div>
        </Fragment>

    )
}

export default Home