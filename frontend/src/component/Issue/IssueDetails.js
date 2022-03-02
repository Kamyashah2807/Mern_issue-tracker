import React, { Fragment, useEffect } from 'react'
import './IssueDetails.css'
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getIssueDetails } from '../../actions/issueAction'
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';

const IssueDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const alert = useAlert()

    const { issue, error } = useSelector(state => state.issueDetails)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getIssueDetails(id))
    }, [dispatch, id, error, alert]);

    return (
        <Fragment>
            <MetaData title={`${issue.title} --ECOMMERCE`} />
            <div className='IssueDetails'>
                <div>
                    <img
                        className='CarouselImage'
                        src={issue.image} key={issue._id} alt={issue.title} />
                </div>
                <div>
                    <div className='detailBlock-1'>
                        <p>Title:{issue.title}</p>
                        <p>Id:{issue._id}</p>
                        <p>Description:{issue.description}</p>
                        <p>Status:{issue.status}</p>
                    </div>

                </div>
            </div>

        </Fragment>
    )
}

export default IssueDetails